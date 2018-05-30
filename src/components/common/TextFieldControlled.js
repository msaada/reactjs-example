//@flow

import TextField from 'material-ui/TextField';
import React from 'react';

type Props = {
  id: string,
  value: string,
  handleChange: (event: SyntheticInputEvent<>) => void,
  type: string,
  floatingLabelText: string,
};
type State = {};
export default class TextFieldControlled extends React.Component<Props, State> {
  render() {
    return (
      <TextField
        id={this.props.id}
        fullwidth
        value={this.props.value}
        onChange={this.props.handleChange}
        type={this.props.type}
        label={this.props.floatingLabelText}
      />
    );
  }
}
