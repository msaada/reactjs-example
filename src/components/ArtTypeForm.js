//@flow

import React, { Component } from "react";

import Button from "material-ui/Button";

import type { ArtTypeType } from "../types/types";

import { addArtTypeToFirebase } from "../javascript/firebaseUtils";
import MyAlert from "./MyAlert";
import { FieldGroup } from "./FieldGroup";
import { CircularProgress } from "material-ui/Progress";

export default class ArtTypeForm extends Component {
  state: {
    artType: ArtTypeType,
    alertVisible: boolean,
    alertMessage: string,
    saving: boolean,
    fieldsStatus: any
  } = {
    artType: {
      id: "",
      name: "",
      picture: ""
    },
    saving: false,
    alertVisible: false,
    alertMessage: "",
    fieldsStatus: {}
  };

  change(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        artType: { ...this.state.artType, [e.target.id]: e.target.value }
      });
    }
  }

  checkFields(arttype: ArtTypeType) {
    return arttype.name;
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.setState({
      saving: true
    });
    const wrongFields = this.getWrongFields();

    if (!wrongFields.length) {
      const firebaseResponse = await addArtTypeToFirebase(this.state.artType);
      if (firebaseResponse) {
        this.handleAlertShow(firebaseResponse.message);
      } else {
        this.setState({
          artType: {
            name: "",
            id: "",
            picture: ""
          }
        });
      }
    } else {
      this.handleAlertShow(`Champs manquants: ${wrongFields.join(", ")}`);
    }
    this.setState({
      saving: false
    });
  }

  handleAlertDismiss = () => {
    this.setState({
      alertVisible: false,
      alertMessage: ""
    });
  };

  getWrongFields = () => {
    const fieldsStatus = this.state.fieldsStatus;
    let wrongFields: string[] = [];
    for (var property in fieldsStatus) {
      if (fieldsStatus.hasOwnProperty(property)) {
        if (!fieldsStatus[property]) {
          wrongFields = [...wrongFields, property];
        }
      }
    }
    return wrongFields;
  };

  handleAlertShow = (errorMessage: string) => {
    this.setState({ alertVisible: true, alertMessage: errorMessage });
  };

  validateFormField = (predicate: boolean, fieldLabel: string) => {
    if (predicate) {
      this.state.fieldsStatus[fieldLabel] = true;
      return "success";
    } else {
      this.state.fieldsStatus[fieldLabel] = false;
      return "error";
    }
  };

  render() {
    return (
      <div>
        <form>
          <FieldGroup
            id="name"
            label="Nom"
            type="text"
            value={this.state.artType.name}
            onChange={(e: Event) => this.change(e)}
            validationState={this.validateFormField(
              this.state.artType.name !== "",
              "Nom"
            )}
          />
          {this.state.alertVisible && (
            <MyAlert
              message={this.state.alertMessage}
              alertDissmiss={this.handleAlertDismiss}
            />
          )}
          <Button onClick={e => this.onSubmit(e)}>Sauvegarder</Button>
          {this.state.saving && <CircularProgress size={90} />}
        </form>
      </div>
    );
  }
}
