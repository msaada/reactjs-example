//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import type { ArtistType } from "../types/types";

import { addArtistToFirebase } from "../javascript/firebaseUtils";

export default class ArtistForm extends Component {
  state: {
    name: string,
    description: string,
    picture: string,
    logo: string,
    typeOfArtPieces: string,
    image: any
  } = {
    name: "",
    picture: "",
    description: "",
    logo: "",
    typeOfArtPieces: "",
    image: null
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

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.checkFields(this.state)) {
      addArtistToFirebase("/artists", this.state);
      // if (storage) {
      //   storage
      //     .ref("/artpieces")
      //     .putString(this.state.image, "data_url")
      //     .then(function(snapshot) {
      //       console.log("Uploaded a data_url string!");
      //     });
      // }
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

  render() {
    return (
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
    );
  }
}
