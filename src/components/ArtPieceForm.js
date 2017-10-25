//@flow

import React, { Component } from "react";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import type { ArtPieceType } from "../types/types";

import { addToFirebase } from "../javascript/firebaseUtils";

export default class ArtPieceForm extends Component {
  state: {
    galeryId: string,
    artistId: string,
    reference: string,
    name: string,
    typeOfArtPieces: string,
    relatedArtPiecesIds: Array<string>,
    description: string,
    buyPriceTaxFree: number,
    buyPriceTaxIncluded: number,
    sellPriceTaxFree: number,
    sellPriceTaxIncluded: number,
    catalogPage: number,
    dimensions: string,
    weight: number,
    imagesLinks: Array<string>
  };

  constructor(props: any) {
    super(props);
    this.state = {
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
      imagesLinks: ["dld"]
    };
  }

  change(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.target.name]: e.target.value
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
    // if (this.checkFields(this.state)){
    addToFirebase("/artpieces", this.state);
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
      imagesLinks: []
    });
    // }
  }

  render() {
    return (
      <form>
        <TextField
          name="reference"
          hintText="Reference"
          floatingLabelText="Reference"
          value={this.state.reference}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="name"
          hintText="Nom"
          floatingLabelText="Nom"
          value={this.state.name}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="typeOfArtPieces"
          hintText="Type de l'oeuvre"
          floatingLabelText="Type de l'oeuvre"
          value={this.state.typeOfArtPieces}
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
          name="buyPriceTaxFree"
          hintText="Prix d'achat (HT)"
          floatingLabelText="Prix d'achat (HT)"
          value={this.state.buyPriceTaxFree}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="buyPriceTaxIncluded"
          hintText="Prix d'achat (TTC)"
          floatingLabelText="Prix d'achat (TTC)"
          value={this.state.buyPriceTaxIncluded}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="sellPriceTaxFree"
          hintText="Prix de vente (HT)"
          floatingLabelText="Prix de vente (HT)"
          value={this.state.sellPriceTaxFree}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="sellPriceTaxIncluded"
          hintText="Prix de vente (TTC)"
          floatingLabelText="Prix de vente (TTC)"
          value={this.state.sellPriceTaxIncluded}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="catalogPage"
          hintText="Page du catalogue"
          floatingLabelText="Page du catalogue"
          value={this.state.catalogPage}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="dimensions"
          hintText="Dimensions"
          floatingLabelText="Dimensions"
          value={this.state.dimensions}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="weight"
          hintText="Poids"
          floatingLabelText="Poids"
          value={this.state.weight}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
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
