import classNames from 'classnames'
import { __ } from '@wordpress/i18n'
import { link, upRightFromSquare } from '@blueprint-blocks/icons'
import Field from '../field'
import BooleanField from '../boolean-field'
import RichTextField from '../rich-text-field'
import Dialog from '../../dialog'
import UrlField from '../url-field'

import './style.css'

function edit( { onInput, className = [], placeholder, value = {}, ...props } ) {

	return (
		<Field.edit
			{ ...props }
			className={ classNames( Array.isArray( className ) && className || [ className ] ) }
			type="link"
			value={ value }
		>
			<div className="blueprint-blocks:link-field-wrap">
				<RichTextField.edit
					tagName="span"
					placeholder={ placeholder }
					value={ value?.label || '' }
					onInput={ ( label ) => onInput(
						Object.assign( {}, value, { label } )
					) }
				/>
				<Dialog
					icon={ <img src={ link }/> }
					label={ __( 'Edit Link Properties' ) }
				>
					<div className="blueprint-blocks:link-field-properties">
						<UrlField.edit
							placeholder="https://"
							value={ value?.href }
							onInput={ ( href ) => onInput(
								Object.assign( {}, value, { href } )
							) }
						/>
						<img src={ upRightFromSquare }/>
						<BooleanField.edit
							options={ [
								{
									label: 'Same Window',
									value: '_self',
								},
								{
									label: 'New Window',
									value: '_blank',
								},
							] }
							tooltip="Open in new window?"
							tooltipPosition="left"
							size="small"
							value={ value?.target === '_blank' }
							onInput={ ( newWindow ) => onInput(
								Object.assign( {}, value, { 
									target: ( newWindow && '_blank' || '_self' ),
								} )
							) }
						/>
					</div>
				</Dialog>
			</div>
		</Field.edit>
	)

}

export default edit
