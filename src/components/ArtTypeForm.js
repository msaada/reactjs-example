//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import type { ArtTypeType } from "../types/types";

import { addArtTypeToFirebase } from "../javascript/firebaseUtils";

export default class ArtTypeForm extends Component {
  state: {
    name: string
  } = { name: "" };

  change(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  }

  checkFields(arttype: ArtTypeType) {
    return arttype.name;
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.checkFields(this.state)) {
      addArtTypeToFirebase("/arttypes", this.state);
      this.setState({
        name: ""
      });
    }
  }

  render() {
    return (
      <form>
        <TextField
          id="name"
          label="First name"
          value={this.state.name}
          onChange={e => this.change(e)}
        />
        <Button onClick={e => this.onSubmit(e)}>Confirmer</Button>
      </form>
    );
  }
}
