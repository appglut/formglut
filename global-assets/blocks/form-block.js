/**
 * FormGlut — "FormGlut Form" block for the block editor.
 * Plain script (no build step): uses the wp.* globals WordPress provides.
 */
( function ( wp ) {
	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var data = window.formglutBlock || { forms: [], editUrl: '', newUrl: '' };
	var InspectorControls = wp.blockEditor.InspectorControls;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var PanelBody = wp.components.PanelBody;
	var SelectControl = wp.components.SelectControl;
	var Placeholder = wp.components.Placeholder;
	var Button = wp.components.Button;
	var ServerSideRender = wp.serverSideRender;

	var options = [ { value: 0, label: __( '— Select a form —', 'formglut' ) } ].concat(
		data.forms.map( function ( f ) {
			return { value: f.id, label: f.title + ( f.status !== 'active' && f.status !== 'published' ? ' (' + f.status + ')' : '' ) };
		} )
	);

	var icon = el( 'svg', { viewBox: '0 0 24 24', width: 24, height: 24 },
		el( 'rect', { x: 4, y: 3, width: 16, height: 18, rx: 2, fill: 'none', stroke: '#e94560', strokeWidth: 2 } ),
		el( 'path', { d: 'M8 8h8M8 12h8M8 16h5', stroke: '#e94560', strokeWidth: 2, strokeLinecap: 'round' } )
	);

	wp.blocks.registerBlockType( 'formglut/form', {
		apiVersion: 3,
		title: __( 'FormGlut Form', 'formglut' ),
		description: __( 'Show one of your FormGlut forms.', 'formglut' ),
		category: 'widgets',
		icon: icon,
		keywords: [ 'form', 'contact', 'formglut' ],
		attributes: { formId: { type: 'number', default: 0 } },
		supports: { html: false, align: [ 'wide', 'full' ] },
		edit: function ( props ) {
			var formId = props.attributes.formId;
			var blockProps = useBlockProps();
			var picker = el( SelectControl, {
				label: __( 'Form', 'formglut' ),
				value: formId,
				options: options,
				onChange: function ( v ) { props.setAttributes( { formId: parseInt( v, 10 ) || 0 } ); },
				__nextHasNoMarginBottom: true,
			} );

			var sidebar = el( InspectorControls, null,
				el( PanelBody, { title: __( 'Form', 'formglut' ) },
					picker,
					formId ? el( 'p', { style: { marginTop: 12 } }, el( 'a', { href: data.editUrl + '&form_id=' + formId, target: '_blank', rel: 'noopener noreferrer' }, __( 'Edit this form', 'formglut' ) ) ) : null
				)
			);

			if ( ! formId ) {
				return el( 'div', blockProps, sidebar,
					el( Placeholder, { icon: icon, label: __( 'FormGlut Form', 'formglut' ), instructions: data.forms.length ? __( 'Choose the form to show.', 'formglut' ) : __( 'You have no forms yet.', 'formglut' ) },
						data.forms.length ? el( 'div', { style: { minWidth: 260 } }, picker ) : el( Button, { variant: 'primary', href: data.newUrl, target: '_blank' }, __( 'Create a form', 'formglut' ) )
					)
				);
			}

			return el( 'div', blockProps, sidebar,
				el( 'div', { style: { pointerEvents: 'none' } },
					el( ServerSideRender, { block: 'formglut/form', attributes: { formId: formId } } )
				)
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp );
