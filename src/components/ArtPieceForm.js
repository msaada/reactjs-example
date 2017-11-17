//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import type { ArtPieceType } from "../types/types";

import { addArtPieceToFirebase } from "../javascript/firebaseUtils";

export default class ArtPieceForm extends Component {
  state: ArtPieceType = {
    id: "",
    galeryId: "",
    artistId: "",
    reference: "",
    name: "",
    typeOfArtPieces: "",
    relatedArtPiecesIds: ["ssss"],
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
    imagesLinks: ["dld"]
  };

  change(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  }

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

  onSubmit(e: Event) {
    e.preventDefault();

    addArtPieceToFirebase("/artpieces", this.state);
    this.setState({
      galeryId: "",
      artistId: "",
      reference: "",
      name: "",
      typeOfArtPieces: "",
      relatedArtPiecesIds: [],
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
      imagesLinks: []
    });
    // }
  }

  render() {
    return (
      <form>
        <TextField
          id="reference"
          label="Reference"
          value={this.state.reference}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="name"
          label="Nom"
          value={this.state.name}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="artistId"
          label="Artiste id"
          value={this.state.artistId}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="typeOfArtPieces"
          label="Type de l'oeuvre"
          value={this.state.typeOfArtPieces}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="description"
          label="description"
          value={this.state.description}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="buyPriceTaxFree"
          label="Prix d'achat (HT)"
          value={this.state.buyPriceTaxFree}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="buyPriceTaxIncluded"
          label="Prix d'achat (TTC)"
          value={this.state.buyPriceTaxIncluded}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="sellPriceTaxFree"
          label="Prix de vente (HT)"
          value={this.state.sellPriceTaxFree}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="sellPriceTaxIncluded"
          label="Prix de vente (TTC)"
          value={this.state.sellPriceTaxIncluded}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="catalogPage"
          label="Page du catalogue"
          value={this.state.catalogPage}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="dimensions"
          label="Dimensions"
          value={this.state.dimensions}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="weight"
          label="Poids"
          value={this.state.weight}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="year"
          label="Année"
          value={this.state.year}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="quantity"
          label="Nombre d'exemplaire"
          value={this.state.quantity}
          onChange={(e: Event) => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <Button raised onClick={(e: Event) => this.onSubmit(e)}>
          Confirmer
        </Button>
      </form>
    );
  }
}
