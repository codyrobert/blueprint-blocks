import Field from '../field'
import RangeField from '../range-field'

function edit( { onInput, min = 0, max = null, step = 1, disabled = false, value, ...props } ) {

	return (
		<Field.edit
			{ ...props }
			type="width"
			value={ value }
		>
			<RangeField.edit
				disabled={ disabled }
				min={ Number( min ) }
				max={ Number( max ) }
				step={ Number( step ) }
				value={ value }
				onInput={ onInput }
			/>
		</Field.edit>
	)
}

export default edit
