import { isExternalUrl, isFragmentUrl } from '@blueprint-blocks/utility'

const selfClosingTagNames = [
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr',
]

function save( {
	attributes,
	blockName,
	name,
	label,
	children = [],
	innerHtml = '',
	className = '',
	tagName = 'div',
	type = 'field',
	render = true,
	...props
} ) {

	if ( render !== true && Boolean( render ) === false ) {
		return
	}

	const fieldProps = Object.assign( {}, props )

	if ( className ) {
		fieldProps.className = className
	}

	if ( tagName === 'a' && 'href' in fieldProps && !( 'rel' in fieldProps ) && ( isExternalUrl( fieldProps.href ) || isFragmentUrl( fieldProps.href ) ) ) {
		fieldProps.rel = 'noopener'
	}

	const Component = tagName

	if ( selfClosingTagNames.includes(tagName) === true || (children?.length || 0) === 0 || props.dangerouslySetInnerHTML ) {
		<Component { ...fieldProps }/>
	}

	return (
		<Component
			{ ...fieldProps }
			children={ children }
		/>
	)

}

export default save
