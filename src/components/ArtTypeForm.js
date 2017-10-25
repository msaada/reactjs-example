//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import type { ArtTypeType } from "../types/types";

import { addToFirebase } from "../javascript/firebaseUtils";

export default class ArtTypeForm extends Component {
  state: {
    name: string
  };

  constructor(props: any) {
    super(props);
    this.state = {
      name: ""
    };
  }

  change(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  checkFields(arttype: ArtTypeType) {
    return arttype.name;
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.checkFields(this.state)) {
      addToFirebase("/arttypes", this.state);
      this.setState({
        name: ""
      });
    }
  }

  render() {
    return (
      <form>
        <TextField
          name="name"
          hintText="First name"
          floatingLabelText="First name"
          value={this.state.name}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <RaisedButton
          label="Confirmer"
          onClick={e => this.onSubmit(e)}
          primary
        />
      </form>
    );
  }
}
