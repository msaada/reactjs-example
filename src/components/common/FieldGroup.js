//@flow
import React from 'react';
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';

export type FieldGroupType = {
  id: string,
  label: string,
  placeholder?: string,
  validationState?: string,
  selectOptions?: any,
  help?: string,
  componentClass?: string,
};

export function FieldGroup({
  id,
  label,
  placeholder,
  validationState,
  selectOptions,
  help,
  ...props
}: FieldGroupType) {
  if (props.componentClass && props.componentClass === 'select')
    return (
      <FormGroup
        controlId={id}
        validationState={validationState}
        bsSize={'small'}
      >
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props}>
          <option value="">{placeholder}</option>
          {selectOptions}
        </FormControl>
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  else
    return (
      <FormGroup
        controlId={id}
        validationState={validationState}
        bsSize={'small'}
      >
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
}
