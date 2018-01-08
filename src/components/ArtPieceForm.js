//@flow

import React, { Component } from "react";

import Button from "material-ui/Button";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Checkbox
} from "react-bootstrap";
import { CircularProgress } from "material-ui/Progress";

import { FieldGroup } from "./FieldGroup";

import type {
  ArtPieceType,
  ArtistType,
  ArtTypeType,
  File
} from "../types/types";

import {
  storage,
  addArtPieceToFirebase,
  addArtistToFirebase
} from "../javascript/firebaseUtils";
import MyAlert from "./MyAlert";

export default class ArtPieceForm extends Component {
  state: ArtPieceType = {
    id: "",
    galeryId: "",
    artistId: "",
    reference: "",
    name: "",
    typeOfArtPieces: "",
    description: "",
    buyPriceTaxFree: -1,
    buyPriceTaxIncluded: -1,
    sellPriceTaxFree: -1,
    sellPriceTaxIncluded: -1,
    catalogPage: -1,
    dimensions: "",
    weight: -1,
    year: "",
    quantity: -1,
    featured: false,
    reserved: false,
    picture: null,
    imagesLinks: [],
    saving: false,
    alertVisible: false,
    alertMessage: ""
  };

  change(e: Event) {
    console.log(e);
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.target.id]: e.target.value
      });
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

  checkFields(artPiece: ArtPieceType) {
    return (
      artPiece.galeryId &&
      artPiece.artistId &&
      artPiece.reference &&
      artPiece.name &&
      artPiece.typeOfArtPieces &&
      artPiece.relatedArtPiecesIds &&
      artPiece.description &&
      artPiece.buyPriceTaxFree &&
      artPiece.buyPriceTaxIncluded &&
      artPiece.sellPriceTaxFree &&
      artPiece.sellPriceTaxIncluded &&
      artPiece.catalogPage &&
      artPiece.dimensions &&
      artPiece.weight &&
      artPiece.imagesLinks
    );
  }

  styles() {
    return {
      select: {
        maxHeight: "10em"
      },
      progress: {
        position: "absolute"
      }
    };
  }

  uploadPictureToFirebase = async (file: File) => {
    const metadata = {
      contentType: "image/jpeg"
    };
    console.log(file);
    console.log(file.name);
    console.log(metadata);

    // Upload file and metadata to the object 'images/mountains.jpg'
    if (storage) {
      const uploadTask = await storage
        .ref()
        .child("images/" + file.name)
        .put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      const snapshot = await storage
        .ref()
        .child("images/" + file.name)
        .put(file, metadata);
      console.log(snapshot);
      if (snapshot.state === "success") {
        this.setState({
          imagesLinks: [snapshot.downloadURL]
        });
      } else {
        console.log("Error on upload");
      }
    }
  };

  onSubmit = async (e: Event) => {
    e.preventDefault();
    this.setState({
      saving: true
    });
    if (this.state.picture) {
      await this.uploadPictureToFirebase(this.state.picture);
    }

    const addArtpieceResponse = await addArtPieceToFirebase(this.state);
    if (!addArtpieceResponse) {
      this.setState({
        galeryId: "",
        reference: "",
        name: "",
        artistId: "",
        description: "",
        buyPriceTaxFree: -1,
        buyPriceTaxIncluded: -1,
        sellPriceTaxFree: -1,
        sellPriceTaxIncluded: -1,
        catalogPage: -1,
        dimensions: "",
        weight: -1,
        year: "",
        quantity: -1,
        featured: false,
        reserved: false,
        imagesLinks: []
      });
    } else {
      this.handleAlertShow(addArtpieceResponse.message);
    }
    this.setState({ saving: false });
  };

  handleChangeArtistId = (event: any) => {
    this.setState({ artistId: event.target.value });
  };

  handleChangeArtTypeId = (event: any) => {
    this.setState({ typeOfArtPieces: event.target.value });
  };

  renderArtistsChoices(artists: Array<ArtistType>) {
    if (artists) {
      return artists.map(artist => (
        <option value={artist.id}>{artist.name}</option>
      ));
    }
  }

  renderArtTypesChoices(arttypes: Array<ArtTypeType>) {
    if (arttypes) {
      return arttypes.map(arttype => (
        <option value={arttype.id}>{arttype.name}</option>
      ));
    }
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        picture: event.target.files[0]
      });
    }
  };

  validateFormField(predicate: boolean) {
    return predicate ? "success" : "error";
  }

  render() {
    return (
      <div>
        <form>
          <FieldGroup
            id="reference"
            type="text"
            label="Référence"
            placeholder="Ex: 1010"
            value={this.state.reference}
            validationState={this.validateFormField(
              this.state.reference !== ""
            )}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="name"
            type="text"
            label="Nom de l'oeuvre"
            placeholder="Kong résine rouge"
            value={this.state.name}
            validationState={this.validateFormField(this.state.name !== "")}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="artistId"
            label="Artiste"
            placeholder="Selectionner l'artiste"
            validationState={this.validateFormField(this.state.artistId !== "")}
            componentClass="select"
            onChange={e => this.handleChangeArtistId(e)}
            selectOptions={this.renderArtistsChoices(this.props.artists)}
          />

          <FieldGroup
            id="typeOfArtPieces"
            label="Type de l'oeuvre"
            placeholder="Selectionner le type de l'oeuvre"
            validationState={this.validateFormField(
              this.state.typeOfArtPieces !== ""
            )}
            componentClass="select"
            onChange={e => this.handleChangeArtTypeId(e)}
            selectOptions={this.renderArtTypesChoices(this.props.arttypes)}
          />

          <FieldGroup
            id="description"
            label="Description"
            type="text"
            value={this.state.description}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="buyPriceTaxFree"
            label="Prix d'achat (HT)"
            type="text"
            value={this.state.buyPriceTaxFree}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="buyPriceTaxIncluded"
            label="Prix d'achat (TTC)"
            type="text"
            value={this.state.buyPriceTaxIncluded}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="sellPriceTaxFree"
            label="Prix de vente (HT)"
            type="text"
            value={this.state.sellPriceTaxFree}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="sellPriceTaxIncluded"
            label="Prix de vente (TTC)"
            type="text"
            validationState={this.validateFormField(
              this.state.sellPriceTaxIncluded > 0
            )}
            value={this.state.sellPriceTaxIncluded}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="catalogPage"
            label="Page du catalogue"
            type="text"
            value={this.state.catalogPage}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="dimensions"
            label="Dimensions"
            type="text"
            value={this.state.dimensions}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="weight"
            label="Poids"
            type="text"
            value={this.state.weight}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="year"
            label="Année"
            type="text"
            value={this.state.year}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="quantity"
            label="Nombre d'exemplaires"
            type="text"
            value={this.state.quantity}
            validationState={this.validateFormField(this.state.quantity > 0)}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="picture"
            type="file"
            label="File"
            onChange={(e: Event) => this.onImageChange(e)}
          />

          <Checkbox
            checked={this.state.featured}
            onChange={e => this.setState({ featured: !this.state.featured })}
          >
            Oeuvre dans la rubrique "Sélection"
          </Checkbox>

          <Checkbox
            checked={this.state.reserved}
            onChange={e => this.setState({ reserved: !this.state.reserved })}
          >
            Oeuvre marquée comme "Réservée"
          </Checkbox>
          {this.state.alertVisible && (
            <MyAlert
              message={this.state.alertMessage}
              alertDissmiss={this.handleAlertDismiss}
            />
          )}
          <Button onClick={(e: Event) => this.onSubmit(e)}>Confirmer</Button>
          {this.state.saving && <CircularProgress size={90} />}
        </form>
      </div>
    );
  }
}
