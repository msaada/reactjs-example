//@flow
import React from "react";

import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

export type FieldGroupType = {
  id: string,
  label: string,
  help?: string
};

export function FieldGroup({ id, label, help, ...props }: FieldGroupType) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
