<?php
/**
 * FormGlut calculations: a small, safe formula evaluator (no eval) for the Calculation field.
 *
 * Supports numbers, + - * / %, parentheses, unary minus and round(x[, decimals]), min(), max(),
 * abs(), ceil(), floor(). Field values are referenced as {field:FIELD_ID}.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Calc class.
 */
class FormGlut_Calc {

	/**
	 * Tokens of the formula being parsed.
	 *
	 * @var array
	 */
	private $tokens = array();

	/**
	 * Current token position.
	 *
	 * @var int
	 */
	private $pos = 0;

	/**
	 * Numeric value a field contributes to a formula.
	 *
	 * @param array $field Field config.
	 * @param mixed $value Submitted (sanitized) value.
	 * @return float
	 */
	public static function field_number( $field, $value ) {
		$type = isset( $field['type'] ) ? $field['type'] : '';
		if ( in_array( $type, array( 'select', 'radio', 'checkbox', 'multiselect' ), true ) ) {
			$map = array();
			foreach ( ( isset( $field['options'] ) && is_array( $field['options'] ) ? $field['options'] : array() ) as $opt ) {
				$key         = isset( $opt['value'] ) && '' !== $opt['value'] ? (string) $opt['value'] : ( isset( $opt['label'] ) ? (string) $opt['label'] : '' );
				$map[ $key ] = isset( $opt['calc_value'] ) && '' !== $opt['calc_value'] ? (float) $opt['calc_value'] : ( is_numeric( $key ) ? (float) $key : 0 );
			}
			$sum = 0;
			foreach ( (array) $value as $v ) {
				$sum += isset( $map[ (string) $v ] ) ? $map[ (string) $v ] : 0;
			}
			return $sum;
		}
		if ( 'toggle' === $type ) {
			$on = isset( $field['on_value'] ) && '' !== $field['on_value'] ? (string) $field['on_value'] : 'Yes';
			return (string) $value === $on ? 1 : 0;
		}
		if ( is_array( $value ) ) {
			return 0;
		}
		$clean = preg_replace( '/[^0-9.\-]/', '', (string) $value );
		return is_numeric( $clean ) ? (float) $clean : 0;
	}

	/**
	 * Evaluate a formula with the given field values.
	 *
	 * @param string $formula Formula text.
	 * @param array  $numbers Field ID => number.
	 * @return float|null Null when the formula is invalid.
	 */
	public static function evaluate( $formula, $numbers ) {
		$expr = preg_replace_callback( '/\{field:([A-Za-z0-9_\-]+)\}/', static function ( $m ) use ( $numbers ) {
			$n = isset( $numbers[ $m[1] ] ) ? (float) $numbers[ $m[1] ] : 0;
			return '(' . ( $n < 0 ? '0' . $n : $n ) . ')';
		}, (string) $formula );

		$calc = new self();
		if ( ! preg_match_all( '/\s*(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[A-Za-z]+|[()+\-*\/%,])/', $expr, $m ) || implode( '', $m[1] ) !== preg_replace( '/\s+/', '', $expr ) ) {
			return null;
		}
		$calc->tokens = $m[1];
		try {
			$result = $calc->expression();
			if ( $calc->pos !== count( $calc->tokens ) || ! is_finite( $result ) ) {
				return null;
			}
			return $result;
		} catch ( Exception $e ) {
			return null;
		}
	}

	/**
	 * Value of a calculation field for a submission.
	 *
	 * @param array $field       Calculation field.
	 * @param array $fields      All (flattened) fields of the form.
	 * @param array $fields_data Submitted values keyed by field ID.
	 * @return string Formatted number ('' when the formula is invalid).
	 */
	public static function for_field( $field, $fields, $fields_data ) {
		$numbers = array();
		foreach ( $fields as $f ) {
			if ( ! empty( $f['id'] ) && array_key_exists( $f['id'], $fields_data ) ) {
				$numbers[ $f['id'] ] = self::field_number( $f, $fields_data[ $f['id'] ] );
			}
		}
		$result = self::evaluate( isset( $field['formula'] ) ? $field['formula'] : '', $numbers );
		if ( null === $result ) {
			return '';
		}
		$decimals = isset( $field['decimals'] ) && '' !== $field['decimals'] ? absint( $field['decimals'] ) : 2;
		return number_format( round( $result, $decimals ), $decimals, '.', '' );
	}

	/** Parser: expression := term (('+'|'-') term)* */
	private function expression() {
		$value = $this->term();
		while ( in_array( $this->peek(), array( '+', '-' ), true ) ) {
			$op    = $this->next();
			$right = $this->term();
			$value = '+' === $op ? $value + $right : $value - $right;
		}
		return $value;
	}

	/** Parser: term := factor (('*'|'/'|'%') factor)* */
	private function term() {
		$value = $this->factor();
		while ( in_array( $this->peek(), array( '*', '/', '%' ), true ) ) {
			$op    = $this->next();
			$right = $this->factor();
			if ( '*' === $op ) {
				$value *= $right;
			} elseif ( 0.0 === (float) $right ) {
				$value = 0; // Division by zero gives 0 instead of an error.
			} else {
				$value = '/' === $op ? $value / $right : fmod( $value, $right );
			}
		}
		return $value;
	}

	/** Parser: factor := number | '-' factor | '(' expression ')' | func '(' args ')' */
	private function factor() {
		$t = $this->next();
		if ( null === $t ) {
			throw new Exception( 'end' );
		}
		if ( is_numeric( $t ) ) {
			return (float) $t;
		}
		if ( '-' === $t ) {
			return -$this->factor();
		}
		if ( '+' === $t ) {
			return $this->factor();
		}
		if ( '(' === $t ) {
			$v = $this->expression();
			$this->expect( ')' );
			return $v;
		}
		$fn = strtolower( $t );
		if ( in_array( $fn, array( 'round', 'min', 'max', 'abs', 'ceil', 'floor' ), true ) ) {
			$this->expect( '(' );
			$args = array( $this->expression() );
			while ( ',' === $this->peek() ) {
				$this->next();
				$args[] = $this->expression();
			}
			$this->expect( ')' );
			switch ( $fn ) {
				case 'round':
					return round( $args[0], isset( $args[1] ) ? (int) $args[1] : 0 );
				case 'min':
					return min( $args );
				case 'max':
					return max( $args );
				case 'abs':
					return abs( $args[0] );
				case 'ceil':
					return ceil( $args[0] );
				default:
					return floor( $args[0] );
			}
		}
		throw new Exception( 'token' );
	}

	private function peek() {
		return isset( $this->tokens[ $this->pos ] ) ? $this->tokens[ $this->pos ] : null;
	}

	private function next() {
		return isset( $this->tokens[ $this->pos ] ) ? $this->tokens[ $this->pos++ ] : null;
	}

	private function expect( $t ) {
		if ( $this->next() !== $t ) {
			throw new Exception( 'expect' );
		}
	}
}
