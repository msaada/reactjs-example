//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import type { ArtTypeType } from "../types/types";

import { addArtTypeToFirebase } from "../javascript/firebaseUtils";
import MyAlert from "./MyAlert";

export default class ArtTypeForm extends Component {
  state: {
    id: string,
    picture: string,
    name: string,
    alertVisible: boolean,
    alertMessage: string
  } = {
    id: "",
    picture: "",
    name: "",
    alertVisible: false,
    alertMessage: ""
  };

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

  async onSubmit(e: Event) {
    e.preventDefault();
    if (this.checkFields(this.state)) {
      const firebaseResponse = await addArtTypeToFirebase(this.state);
      if (firebaseResponse) {
        this.handleAlertShow(firebaseResponse.message);
      } else {
        this.setState({
          name: "",
          id: "",
          picture: ""
        });
      }
    }
  }

  handleAlertDismiss = () => {
    this.setState({
      alertVisible: false,
      alertMessage: ""
    });
  };

  handleAlertShow = (errorMessage: string) => {
    this.setState({ alertVisible: true, alertMessage: errorMessage });
  };
  render() {
    return (
      <div>
        {this.state.alertVisible && (
          <MyAlert
            message={this.state.alertMessage}
            alertDissmiss={this.handleAlertDismiss}
          />
        )}
        <form>
          <TextField
            id="name"
            label="Nom"
            value={this.state.name}
            onChange={(e: Event) => this.change(e)}
          />
          <Button onClick={e => this.onSubmit(e)}>Confirmer</Button>
        </form>
      </div>
    );
  }
}
