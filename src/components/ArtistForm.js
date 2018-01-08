//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import type { ArtistType } from "../types/types";

import {
  addArtistToFirebase,
  uploadPictureToFirebase
} from "../javascript/firebaseUtils";

import MyAlert from "./MyAlert";
import { FieldGroup } from "./FieldGroup";

export default class ArtistForm extends Component {
  state: {
    id: string,
    name: string,
    description: string,
    picture: string,
    logo: string,
    featured: boolean,
    typeOfArtPieces: string,
    logoFile: any,
    pictureFile: any,
    alertVisible: boolean,
    alertMessage: string,
    saving: boolean,
    fieldsStatus: any
  } = {
    id: "",
    name: "",
    picture: "",
    description: "",
    logo: "",
    typeOfArtPieces: "",
    featured: false,
    pictureFile: null,
    logoFile: null,
    pictureFile: null,
    alertVisible: false,
    alertMessage: "",
    saving: false,
    fieldsStatus: {}
  };

  change(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  }

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

  onSubmit = async (e: Event) => {
    e.preventDefault();
    this.setState({
      saving: true
    });

    if (this.state.logoFile) {
      const logoUrl = await uploadPictureToFirebase(this.state.logoFile);
      console.log(logoUrl);
      if (logoUrl) {
        this.setState({
          logo: logoUrl
        });
      }
    }

    if (this.state.pictureFile) {
      const pictureUrl = await uploadPictureToFirebase(this.state.pictureFile);
      console.log(pictureUrl);

      if (pictureUrl) {
        this.setState({
          picture: pictureUrl
        });
      }
    }
    const wrongFields = this.getWrongFields();
    if (!wrongFields.length) {
      const firebaseResponse = await addArtistToFirebase(this.state);

      if (firebaseResponse) {
        this.handleAlertShow(firebaseResponse.message);
      } else {
        this.setState({
          name: "",
          picture: "",
          description: "",
          typeOfArtPieces: "",
          logo: "",
          pictureFile: null,
          logoFile: null
        });
      }
    } else {
      this.handleAlertShow(`Champs manquants: ${wrongFields.join(", ")}`);
    }
  };

  handleAlertDismiss = () => {
    this.setState({
      alertVisible: false,
      alertMessage: ""
    });
  };

  handleAlertShow = (errorMessage: string) => {
    this.setState({ alertVisible: true, alertMessage: errorMessage });
  };

  validateFormField = (predicate: boolean, fieldId: string) => {
    if (predicate) {
      this.state.fieldsStatus[fieldId] = true;
      return "success";
    } else {
      this.state.fieldsStatus[fieldId] = false;

      // this.setState({
      //   wrongFields: this.state.wrongFields.add(fieldLabel)
      // });
      return "error";
    }
  };

  onImageChange = (event, logo: boolean) => {
    if (event.target.files && event.target.files[0]) {
      if (logo) {
        this.setState({
          logoFile: event.target.files[0]
        });
      } else {
        this.setState({
          pictureFile: event.target.files[0]
        });
      }
    }
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
        <form noValidate>
          <FieldGroup
            id="name"
            type="text"
            label="Nom de l'artiste"
            value={this.state.name}
            validationState={this.validateFormField(
              this.state.name !== "",
              "Nom de l'artiste"
            )}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="photo"
            type="file"
            label="Photo"
            onChange={(e: Event) => this.onImageChange(e, false)}
          />

          <FieldGroup
            id="logo"
            type="file"
            label="Logo"
            onChange={(e: Event) => this.onImageChange(e, true)}
          />

          {/* <TextField
            id="picture"
            label="Photo"
            value={this.state.picture}
            onChange={(e: Event) => this.change(e)}
            fullwidth
          />

          <TextField
            id="logo"
            label="Logo"
            value={this.state.logo}
            onChange={(e: Event) => this.change(e)}
            fullwidth
          /> */}

          <FieldGroup
            id="description"
            type="text"
            label="Biographie de l'artiste"
            value={this.state.description}
            validationState={this.validateFormField(
              this.state.description !== "",
              "Biographie de l'artiste"
            )}
            onChange={(e: Event) => this.change(e)}
          />

          <Button raised onClick={(e: Event) => this.onSubmit(e)}>
            Confirmer
          </Button>
        </form>
      </div>
    );
  }
}
