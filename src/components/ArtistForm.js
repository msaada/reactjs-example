//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import type { ArtistType } from "../types/types";

import { addArtistToFirebase } from "../javascript/firebaseUtils";

import MyAlert from "./MyAlert";

export default class ArtistForm extends Component {
  state: {
    id: string,
    name: string,
    description: string,
    picture: string,
    logo: string,
    featured: boolean,
    typeOfArtPieces: string,
    image: any,
    alertVisible: boolean,
    alertMessage: string
  } = {
    id: "",
    name: "",
    picture: "",
    description: "",
    logo: "",
    typeOfArtPieces: "",
    featured: false,
    image: null,
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

  checkFields(artist: ArtistType) {
    return (
      artist.name &&
      artist.picture &&
      artist.description &&
      artist.typeOfArtPieces &&
      artist.logo
    );
  }

  onImageLoad(event: Event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: Event) => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit = async (e: Event) => {
    e.preventDefault();
    if (this.checkFields(this.state)) {
      const firebaseResponse = await addArtistToFirebase(this.state);
      // if (storage) {
      //   storage
      //     .ref("/artpieces")
      //     .putString(this.state.image, "data_url")
      //     .then(function(snapshot) {
      //       console.log("Uploaded a data_url string!");
      //     });
      // }
      if (firebaseResponse) {
        this.handleAlertShow(firebaseResponse.message);
      } else {
        this.setState({
          name: "",
          picture: "",
          description: "",
          typeOfArtPieces: "",
          logo: "",
          image: null
        });
      }
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
          <TextField
            id="name"
            label="Nom"
            value={this.state.name}
            onChange={(e: Event) => this.change(e)}
            fullwidth
            autoFocus
          />

          <br />
          <TextField
            id="picture"
            label="Photo"
            value={this.state.picture}
            onChange={(e: Event) => this.change(e)}
            fullwidth
          />
          <br />
          <TextField
            id="logo"
            label="Logo"
            value={this.state.logo}
            onChange={(e: Event) => this.change(e)}
            fullwidth
          />
          <br />
          <TextField
            id="description"
            label="Description"
            value={this.state.description}
            onChange={(e: Event) => this.change(e)}
          />
          <br />
          <TextField
            id="typeOfArtPieces"
            label="Type des oeuvres"
            value={this.state.typeOfArtPieces}
            onChange={(e: Event) => this.change(e)}
            fullwidth
          />
          <br />
          <Button raised onClick={(e: Event) => this.onSubmit(e)}>
            Confirmer
          </Button>
        </form>
      </div>
    );
  }
}
