//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

import type { ArtistType } from "../types/types";

import { storage, addToFirebase } from "../javascript/firebaseUtils";

export default class ArtistForm extends Component {
  state: {
    firstName: string,
    lastName: string,
    picture: string,
    description: string,
    imagesLinks: Array<string>,
    typeOfArtPieces: string,
    artPiecesIds: Array<string>,
    image: any
  };

  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      picture: "",
      description: "",
      imagesLinks: [],
      typeOfArtPieces: "",
      artPiecesIds: [],
      image: null
    };
  }

  change(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  checkFields(artist: ArtistType) {
    return (
      artist.firstName &&
      artist.lastName &&
      artist.picture &&
      artist.description &&
      artist.imagesLinks &&
      artist.typeOfArtPieces &&
      artist.artPiecesIds
    );
  }

  onImageLoad(event: Event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: Event) => {
        console.log(e.target.result);
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.checkFields(this.state)) {
      addToFirebase("/artists", this.state);
      if (storage) {
        storage
          .ref("/artpieces")
          .putString(this.state.image, "data_url")
          .then(function(snapshot) {
            console.log("Uploaded a data_url string!");
          });
      }
      this.setState({
        firstName: "",
        lastName: "",
        picture: "",
        description: "",
        imagesLinks: [],
        typeOfArtPieces: "",
        artPiecesIds: []
      });
    }
  }

  render() {
    return (
      <form>
        <TextField
          name="firstName"
          hintText="First name"
          floatingLabelText="First name"
          value={this.state.firstName}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="lastName"
          hintText="Last Name"
          floatingLabelText="Last Name"
          value={this.state.lastName}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="picture"
          hintText="picture"
          floatingLabelText="picture"
          value={this.state.picture}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="description"
          hintText="description"
          floatingLabelText="description"
          value={this.state.description}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="typeOfArtPieces"
          hintText="typeOfArtPieces"
          floatingLabelText="typeOfArtPieces"
          value={this.state.typeOfArtPieces}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <FlatButton label="Choose an Image" primary={true}>
          {/* <input id="imageButton" type="file"></input> */}
          <input
            type="file"
            onChange={this.onImageLoad.bind(this)}
            className="filetype"
            id="group_image"
          />
        </FlatButton>
        <br />
        <RaisedButton
          label="Confirmer"
          onClick={e => this.onSubmit(e)}
          primary
        />
      </form>
    );
  }
}
