import classNames from 'classnames'

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Field components from Blueprint Blocks
 *
 * @see https://www.blueprint-blocks.com/docs/
 */
import RichTextField from '../rich-text-field';

const Fields = {
	'rich-text': RichTextField,
}

/**
 * Renders an array of JSX objects
 * 
 * @param {array} jsx 
 */
function renderJsxArray( { attributes, setAttributes, jsx = [] } ) {

	return jsx.map( ( { children = [], className = [], attributeName = '', type = '', tagName = 'div', ...props } ) => {

		let Component = tagName

		if ( type in Fields && Fields[type] ) {
			Component = Fields[type].edit

			return (
				<Component
					{ ...props }
					name={ attributeName }
					tagName={ tagName }
					attributes={ attributes }
					setAttributes={ setAttributes }
					onInput={ ( value ) => {
						setAttributes( { 
							[attributeName]: value,
						} )
					} }
					value={ attributes?.[attributeName] }
				>
					{ renderJsxArray( { attributes, setAttributes, jsx: children } ) }
				</Component>
			)
		}

		return (
			<Component { ...props } className={ classNames(...className) }>
				{ renderJsxArray( { attributes, setAttributes, jsx: children } ) }
			</Component>
		)

	} )

}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function BlockEdit( { blockEdit = {}, blockSidebar = [], blockToolbar = [] } ) {

	return ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps.save()
		
		return renderJsxArray( {
			attributes,
			setAttributes,
			jsx: [ {
				...blockProps,
				...blockEdit,
				className: [
					...(Array.isArray(blockProps.className) && blockProps.className || [blockProps.className]),
					...(Array.isArray(blockEdit.className) && blockEdit.className || [blockEdit.className])
				]
			} ]
		} )
		
	}
	
}

export default BlockEdit