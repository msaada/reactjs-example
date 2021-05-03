import TextField from '@material-ui/core/TextField';
import React from 'react';
export default class TextFieldControlled extends React.Component {
  render() {
    return (
      <TextField
        id={this.props.id}
        fullWidth
        value={this.props.value}
        onChange={this.props.handleChange}
        type={this.props.type}
        label={this.props.floatingLabelText}
      />
    );
  }
}
