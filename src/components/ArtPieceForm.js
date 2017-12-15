//@flow

import React, { Component } from "react";

import Button from "material-ui/Button";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Checkbox
} from "react-bootstrap";

import { FieldGroup } from "./FieldGroup";

import type { ArtPieceType, ArtistType, ArtTypeType } from "../types/types";

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
    buyPriceTaxFree: "",
    buyPriceTaxIncluded: "",
    sellPriceTaxFree: "",
    sellPriceTaxIncluded: "",
    catalogPage: -1,
    dimensions: "",
    weight: -1,
    year: "",
    quantity: -1,
    featured: true,
    reserved: false,
    picture: null,
    imagesLinks: ["dld"]
  };

  change(e: Event) {
    console.log(e);
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

  styles() {
    return {
      select: {
        maxHeight: "10em"
      }
    };
  }

  onSubmit(e: Event) {
    e.preventDefault();

    addArtPieceToFirebase("/artpieces", this.state);
    this.setState({
      galeryId: "",
      reference: "",
      name: "",
      relatedArtPiecesIds: [],
      description: "",
      buyPriceTaxFree: "",
      buyPriceTaxIncluded: "",
      sellPriceTaxFree: "",
      sellPriceTaxIncluded: "",
      catalogPage: -1,
      dimensions: "",
      weight: -1,
      year: "",
      quantity: -1,
      featured: false,
      reserved: false,
      imagesLinks: []
    });
  }

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

  onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ picture: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  render() {
    return (
      <form>
        <FieldGroup
          id="reference"
          type="text"
          label="Référence"
          placeholder="Ex: 1010"
          value={this.state.reference}
          onChange={(e: Event) => this.change(e)}
        />
        <FieldGroup
          id="name"
          type="text"
          label="Nom de l'oeuvre"
          placeholder="Kong résine rouge"
          value={this.state.name}
          onChange={(e: Event) => this.change(e)}
        />

        <FormGroup controlId="artistId">
          <ControlLabel>Artiste</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="Selectionner l'artiste"
            onChange={e => this.handleChangeArtistId(e)}
          >
            <option value="">Selectionner l'artiste</option>
            {this.renderArtistsChoices(this.props.artists)}
          </FormControl>
        </FormGroup>

        <FormGroup controlId="typeOfArtPieces">
          <ControlLabel>Type de l'oeuvre</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="Selectionner le type de l'oeuvre"
            onChange={e => this.handleChangeArtTypeId(e)}
          >
            <option value="">Selectionner le type de l'oeuvre</option>
            {this.renderArtTypesChoices(this.props.arttypes)}
          </FormControl>
        </FormGroup>

        <FieldGroup
          id="description"
          label="Description"
          type="text"
          value={this.state.description}
          onChange={(e: Event) => this.change(e)}
        />

        {/* <FormGroup
          controlId="description"
          onChange={(e: Event) => this.change(e)}
        >
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textarea" placeholder="" />
        </FormGroup> */}

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

        <Button onClick={(e: Event) => this.onSubmit(e)}>Confirmer</Button>
      </form>
    );
  }
}
