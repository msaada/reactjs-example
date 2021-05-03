import React from 'react';
import {
  FormLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';

export function FieldGroup({
  id,
  label,
  placeholder,
  validationState,
  selectOptions,
  help,
  ...props
}) {
  if (props.componentClass && props.componentClass === 'select')
    return (
      <FormGroup
        controlId={id}
        validationState={validationState}
        bsSize={'small'}
      >
        <FormLabel>{label}</FormLabel>
        <FormControl {...props}>
          <option value="">{placeholder}</option>
          {selectOptions}
        </FormControl>
        {/* {help && <HelpBlock>{help}</HelpBlock>} */}
      </FormGroup>
    );
  else
    return (
      <FormGroup
        controlId={id}
        validationState={validationState}
        bsSize={'small'}
      >
        <FormLabel>{label}</FormLabel>
        <FormControl {...props} />
        {/* {help && <HelpBlock>{help}</HelpBlock>} */}
      </FormGroup>
    );
}
