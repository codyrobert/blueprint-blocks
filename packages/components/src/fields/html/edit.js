import Field from '../field/index.js'

function edit( { children, dangerouslySetInnerHTML, innerHtml = '', ...props } ) {

	if ( innerHtml.length > 0 ) {
		return (
			<Field.edit
				{ ...props }
				type="html"
				dangerouslySetInnerHTML={ {
					__html: innerHtml,
				} }
			/>
		)
	}

	return (
		<Field.edit
			{ ...props }
			type="html"
			children={ children }
		/>
	)

}

export default edit
