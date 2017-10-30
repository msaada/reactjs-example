//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

import type { ArtistType } from "../types/types";

import { storage, addToFirebase } from "../javascript/firebaseUtils";

export default class ArtistForm extends Component {
  state: {
    name: string,
    description: string,
    picture: string,
    logo: string,
    typeOfArtPieces: string,
    image: any
  };

  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      picture: "",
      description: "",
      logo: "",
      typeOfArtPieces: "",
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
        artPiecesIds: []
      });
    }
  }

  render() {
    return (
      <form>
        <TextField
          name="name"
          hintText="Name"
          floatingLabelText="Name"
          value={this.state.name}
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
          name="logo"
          hintText="logo"
          floatingLabelText="logo"
          value={this.state.logo}
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
