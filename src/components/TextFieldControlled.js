//@flow

import React from "react";
import TextField from "material-ui/TextField";

export default class TextFieldControlled extends React.Component {
  render() {
    return (
      <div>
        <TextField
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.handleChange}
          type={this.props.type}
          hintText={this.props.hintText}
          floatingLabelText={this.props.floatingLabelText}
        />
      </div>
    );
  }
}
