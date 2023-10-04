import classNames from 'classnames'
import { RichText } from '@wordpress/block-editor'
import getFieldClassNames from '../field/functions/get-field-class-names.js'

function edit( {
	blockName,
	name,
	placeholder,
	allowedFormats = null,
	disabled = false,
	tagName = 'p',
	className = [],
	display = true,
	value,
	onInput,
	...props
} ) {

	if ( display !== true && Boolean( display ) === false ) {
		return
	}

	if ( disabled === true ) {
		const Component = tagName
		return <Component
			className={ classNames(
				getFieldClassNames( {
					blockName,
					name,
					type: 'rich-text',
					value,
				} ),
				...( Array.isArray( className ) && className || [ className ] )
			) }
			dangerouslySetInnerHTML={ { __html: value } }
		/>
	}

	return (
		<RichText
			className={ classNames(
				getFieldClassNames( {
					blockName,
					name,
					type: 'rich-text',
					value,
				} ),
				...( Array.isArray( className ) && className || [ className ] )
			) }
			onChange={ onInput }
			tagName={ tagName }
			allowedFormats={ allowedFormats }
			keepPlaceholderOnFocus={ true }
			placeholder={ placeholder }
			value={ value }
		/>
	)
}

export default edit
