<?php
/**
 * FormGlut File Uploads.
 *
 * Rules, validation and storage for the File Upload field. Files are stored in
 * wp-content/uploads/formglut/{form_id}/ with random names, and PHP execution is blocked there.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Uploads class.
 */
class FormGlut_Uploads {

	/**
	 * Image extensions used when "Images only" is on.
	 */
	const IMAGE_TYPES = array( 'jpg', 'jpeg', 'png', 'gif', 'webp' );

	/**
	 * Extensions never accepted, whatever the field says.
	 */
	const BLOCKED_TYPES = array( 'php', 'php3', 'php4', 'php5', 'php7', 'phtml', 'phar', 'exe', 'js', 'sh', 'bat', 'cgi', 'pl', 'py', 'htaccess', 'svg', 'html', 'htm' );

	/**
	 * Resolved limits for a field.
	 *
	 * @param array $field Field config.
	 * @return array { types: string[], max_mb: float, multiple: bool, max_files: int }
	 */
	public static function rules( $field ) {
		if ( ! empty( $field['images_only'] ) ) {
			$types = self::IMAGE_TYPES;
		} else {
			$raw   = isset( $field['allowed_types'] ) ? (string) $field['allowed_types'] : '';
			$types = array_filter( array_map( static function ( $t ) {
				return strtolower( trim( ltrim( trim( $t ), '.' ) ) );
			}, explode( ',', $raw ) ) );
			$types = array_values( array_diff( array_unique( $types ), self::BLOCKED_TYPES ) );
			if ( empty( $types ) ) {
				$types = array( 'jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx', 'txt' );
			}
		}

		$server_mb = wp_max_upload_size() / MB_IN_BYTES;
		$max_mb    = isset( $field['max_size'] ) && (float) $field['max_size'] > 0 ? (float) $field['max_size'] : 5;

		return array(
			'types'     => $types,
			'max_mb'    => round( min( $max_mb, $server_mb ), 2 ),
			'multiple'  => ! empty( $field['multiple'] ),
			'max_files' => ! empty( $field['multiple'] ) ? max( 1, absint( isset( $field['max_files'] ) ? $field['max_files'] : 3 ) ) : 1,
		);
	}

	/**
	 * Normalise $_FILES[ name ] (single or array) into a list of files that were actually sent.
	 *
	 * @param string $name Input name without [].
	 * @return array[]
	 */
	public static function collect( $name ) {
		if ( empty( $_FILES[ $name ] ) || ! is_array( $_FILES[ $name ]['name'] ?? null ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			return array();
		}
		$raw  = $_FILES[ $name ]; // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput
		$list = array();
		foreach ( $raw['name'] as $i => $file_name ) {
			if ( '' === (string) $file_name || UPLOAD_ERR_NO_FILE === (int) $raw['error'][ $i ] ) {
				continue;
			}
			$list[] = array(
				'name'     => sanitize_file_name( wp_unslash( $file_name ) ),
				'type'     => (string) $raw['type'][ $i ],
				'tmp_name' => (string) $raw['tmp_name'][ $i ],
				'error'    => (int) $raw['error'][ $i ],
				'size'     => (int) $raw['size'][ $i ],
			);
		}
		return $list;
	}

	/**
	 * Check files against the field rules.
	 *
	 * @param array  $field Field config.
	 * @param array  $files From collect().
	 * @param string $label Field label for messages.
	 * @return string Error message, or '' when valid.
	 */
	public static function validate( $field, $files, $label ) {
		$rules = self::rules( $field );

		if ( count( $files ) > $rules['max_files'] ) {
			/* translators: 1: field label, 2: number of files */
			return sprintf( _n( '%1$s accepts only %2$d file.', '%1$s accepts up to %2$d files.', $rules['max_files'], 'formglut' ), $label, $rules['max_files'] );
		}

		foreach ( $files as $file ) {
			if ( UPLOAD_ERR_OK !== $file['error'] || ! is_uploaded_file( $file['tmp_name'] ) ) {
				/* translators: %s: file name */
				return sprintf( __( '%s could not be uploaded. Please try again.', 'formglut' ), $file['name'] );
			}
			if ( $file['size'] > $rules['max_mb'] * MB_IN_BYTES ) {
				/* translators: 1: file name, 2: size in MB */
				return sprintf( __( '%1$s is larger than %2$s MB.', 'formglut' ), $file['name'], $rules['max_mb'] );
			}
			$check = wp_check_filetype_and_ext( $file['tmp_name'], $file['name'] );
			$ext   = strtolower( (string) ( $check['ext'] ? $check['ext'] : pathinfo( $file['name'], PATHINFO_EXTENSION ) ) );
			if ( ! $check['ext'] || ! in_array( $ext, $rules['types'], true ) ) {
				/* translators: 1: file name, 2: allowed extensions */
				return sprintf( __( '%1$s is not an allowed file type. Allowed: %2$s.', 'formglut' ), $file['name'], strtoupper( implode( ', ', $rules['types'] ) ) );
			}
		}

		return '';
	}

	/**
	 * Move validated files into the FormGlut upload folder.
	 *
	 * @param array $files   From collect(), already validated.
	 * @param int   $form_id Form ID.
	 * @return string[] Public URLs of the stored files.
	 */
	public static function store( $files, $form_id ) {
		if ( empty( $files ) ) {
			return array();
		}
		require_once ABSPATH . 'wp-admin/includes/file.php';

		$sub    = '/formglut/' . absint( $form_id );
		$filter = static function ( $dirs ) use ( $sub ) {
			$dirs['subdir'] = $sub;
			$dirs['path']   = $dirs['basedir'] . $sub;
			$dirs['url']    = $dirs['baseurl'] . $sub;
			return $dirs;
		};
		add_filter( 'upload_dir', $filter );
		self::protect_folder();

		$urls = array();
		foreach ( $files as $file ) {
			// Random prefix so stored files cannot be guessed from the original name.
			$file['name'] = wp_generate_password( 12, false ) . '-' . $file['name'];
			$moved        = wp_handle_upload( $file, array( 'test_form' => false ) );
			if ( ! empty( $moved['url'] ) ) {
				$urls[] = $moved['url'];
			}
		}

		remove_filter( 'upload_dir', $filter );
		return $urls;
	}

	/**
	 * Local file path for an uploaded file URL (for email attachments), or '' if it is not ours.
	 *
	 * @param string $url File URL.
	 * @return string
	 */
	public static function path_from_url( $url ) {
		$dirs = wp_get_upload_dir();
		$base = trailingslashit( $dirs['baseurl'] ) . 'formglut/';
		if ( 0 !== strpos( (string) $url, $base ) ) {
			return '';
		}
		$path = trailingslashit( $dirs['basedir'] ) . 'formglut/' . substr( $url, strlen( $base ) );
		return false === strpos( $path, '..' ) && file_exists( $path ) ? $path : '';
	}

	/**
	 * Block script execution and directory listing in uploads/formglut.
	 *
	 * @return void
	 */
	private static function protect_folder() {
		$dirs = wp_get_upload_dir();
		$root = trailingslashit( $dirs['basedir'] ) . 'formglut';
		if ( ! wp_mkdir_p( $root ) ) {
			return;
		}
		if ( ! file_exists( $root . '/index.php' ) ) {
			file_put_contents( $root . '/index.php', "<?php\n// Silence is golden.\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		}
		if ( ! file_exists( $root . '/.htaccess' ) ) {
			file_put_contents( $root . '/.htaccess', "Options -Indexes\n<FilesMatch \"\\.(php|phtml|phar|pl|py|cgi|sh)$\">\n\tRequire all denied\n</FilesMatch>\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		}
	}
}
