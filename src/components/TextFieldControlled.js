//@flow

import React from "react";
import TextField from "material-ui/TextField";

export default class TextFieldControlled extends React.Component {
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
