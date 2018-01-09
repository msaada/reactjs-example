//@flow

import React, { Component } from "react";

import Button from "material-ui/Button";
import { Checkbox } from "react-bootstrap";
import { CircularProgress } from "material-ui/Progress";

import { FieldGroup } from "./FieldGroup";

import type {
  ArtPieceType,
  ArtistType,
  ArtTypeType,
  File
} from "../types/types";

import {
  addArtPieceToFirebase,
  addArtistToFirebase,
  uploadPictureToFirebase
} from "../javascript/firebaseUtils";
import MyAlert from "./MyAlert";

export default class ArtPieceForm extends Component {
  state: {
    artPiece: ArtPieceType,
    picture: any,
    saving: boolean,
    alertVisible: boolean,
    alertMessage: string,
    fieldsStatus: any
  } = {
    artPiece: {
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
      imagesLinks: []
    },
    picture: null,
    saving: false,
    alertVisible: false,
    alertMessage: "",
    fieldsStatus: {}
  };

  change(e: Event) {
    console.log(e);
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        artPiece: { ...this.state.artPiece, [e.target.id]: e.target.value }
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
    const wrongFields = this.getWrongFields();

    if (!wrongFields.length) {
      if (this.state.picture) {
        const imageLink = await uploadPictureToFirebase(this.state.picture);
        if (imageLink) {
          this.setState({
            artPiece: { ...this.state.artPiece, imagesLinks: [imageLink] }
          });
        } else {
          this.handleAlertShow(
            "La sauvegarde de la photo de l'oeuvre a écouhé. Veuillez rééssayer."
          );
          this.setState({
            saving: false
          });
          return;
        }
      }
      const addArtpieceResponse = await addArtPieceToFirebase(
        this.state.artPiece
      );
      if (!addArtpieceResponse) {
        this.setState({
          artPiece: {
            id: "",
            galeryId: "",
            reference: "",
            name: "",
            artistId: "",
            description: "",
            typeOfArtPieces: "",
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
          },
          picture: null
        });
      } else {
        this.handleAlertShow(addArtpieceResponse.message);
      }
    } else {
      this.handleAlertShow(`Champs manquants: ${wrongFields.join(", ")}`);
    }
    this.setState({ saving: false });
  };

  handleChangeArtistId = (event: any) => {
    this.setState({
      artPiece: { ...this.state.artPiece, artistId: event.target.value }
    });
  };

  handleChangeArtTypeId = (event: any) => {
    this.setState({
      artPiece: { ...this.state.artPiece, typeOfArtPieces: event.target.value }
    });
  };

  renderArtistsChoices(artists: ArtistType[]) {
    if (artists) {
      return artists.map(artist => (
        <option value={artist.id}>{artist.name}</option>
      ));
    }
  }

  renderArtTypesChoices(arttypes: ArtTypeType[]) {
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

  // validateFormField(predicate: boolean) {
  //   return predicate ? "success" : "error";
  // }
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
            id="reference"
            type="text"
            label="Référence"
            placeholder="Ex: 1010"
            value={this.state.artPiece.reference}
            validationState={this.validateFormField(
              this.state.artPiece.reference !== "",
              "Référence"
            )}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="name"
            type="text"
            label="Nom de l'oeuvre"
            placeholder="Kong résine rouge"
            value={this.state.artPiece.name}
            validationState={this.validateFormField(
              this.state.artPiece.name !== "",
              "Nom de l'oeuvre"
            )}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="artistId"
            label="Artiste"
            placeholder="Selectionner l'artiste"
            validationState={this.validateFormField(
              this.state.artPiece.artistId !== "",
              "Artiste"
            )}
            componentClass="select"
            onChange={e => this.handleChangeArtistId(e)}
            selectOptions={this.renderArtistsChoices(this.props.artists)}
          />

          <FieldGroup
            id="typeOfArtPieces"
            label="Type de l'oeuvre"
            placeholder="Selectionner le type de l'oeuvre"
            validationState={this.validateFormField(
              this.state.artPiece.typeOfArtPieces !== "",
              "Type de l'oeuvre"
            )}
            componentClass="select"
            onChange={e => this.handleChangeArtTypeId(e)}
            selectOptions={this.renderArtTypesChoices(this.props.arttypes)}
          />

          <FieldGroup
            id="description"
            label="Description"
            type="text"
            value={this.state.artPiece.description}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="buyPriceTaxFree"
            label="Prix d'achat (HT)"
            type="text"
            value={this.state.artPiece.buyPriceTaxFree}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="buyPriceTaxIncluded"
            label="Prix d'achat (TTC)"
            type="text"
            value={this.state.artPiece.buyPriceTaxIncluded}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="sellPriceTaxFree"
            label="Prix de vente (HT)"
            type="text"
            value={this.state.artPiece.sellPriceTaxFree}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="sellPriceTaxIncluded"
            label="Prix de vente (TTC)"
            type="text"
            validationState={this.validateFormField(
              this.state.artPiece.sellPriceTaxIncluded > 0,
              "Prix de vente (TTC)"
            )}
            value={this.state.artPiece.sellPriceTaxIncluded}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="catalogPage"
            label="Page du catalogue"
            type="text"
            value={this.state.artPiece.catalogPage}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="dimensions"
            label="Dimensions"
            type="text"
            value={this.state.artPiece.dimensions}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="weight"
            label="Poids"
            type="text"
            value={this.state.artPiece.weight}
            onChange={(e: Event) => this.change(e)}
          />
          <FieldGroup
            id="year"
            label="Année"
            type="text"
            value={this.state.artPiece.year}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="quantity"
            label="Nombre d'exemplaires"
            type="text"
            value={this.state.artPiece.quantity}
            validationState={this.validateFormField(
              this.state.artPiece.quantity > 0,
              "Nombre d'exemplaires"
            )}
            onChange={(e: Event) => this.change(e)}
          />

          <FieldGroup
            id="picture"
            type="file"
            label="Photo"
            validationState={this.validateFormField(
              this.state.picture !== null,
              "Photo"
            )}
            onChange={(e: Event) => this.onImageChange(e)}
          />

          <Checkbox
            checked={this.state.artPiece.featured}
            onChange={e =>
              this.setState({
                artPiece: {
                  ...this.state.artPiece,
                  featured: !this.state.artPiece.featured
                }
              })
            }
          >
            Oeuvre dans la rubrique "Sélection"
          </Checkbox>

          <Checkbox
            checked={this.state.artPiece.reserved}
            onChange={e =>
              this.setState({
                artPiece: {
                  ...this.state.artPiece,
                  reserved: !this.state.artPiece.reserved
                }
              })
            }
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
