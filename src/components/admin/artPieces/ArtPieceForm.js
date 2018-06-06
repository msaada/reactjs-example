//@flow

import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import {
  addArtPieceToFirebase,
  updateArtPieceToFirebase,
  uploadPictureToFirebase,
} from '../../../javascript/firebaseUtils';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import { FieldGroup } from '../../common/FieldGroup';
import MyAlert from '../../common/MyAlert';

import type { Element } from 'react';

import type {
  ArtPieceType,
  ArtistType,
  ArtTypeType,
} from '../../../types/types';

type Props = {
  defaultArtpiece: ?ArtPieceType,
  artists: ArtistType[],
  arttypes: ArtTypeType[],
};

type State = {
  artPiece: ArtPieceType,
  picture: ?File,
  saving: boolean,
  alertVisible: boolean,
  alertMessage: string,
  fieldsStatus: { [string]: boolean },
};

export default class ArtPieceForm extends Component<Props, State> {
  state = {
    artPiece: {
      id: '',
      galeryId: '',
      artistId: '',
      reference: '',
      name: '',
      typeOfArtPieces: '',
      description: '',
      buyPriceTaxFree: -1,
      buyPriceTaxIncluded: -1,
      sellPriceTaxFree: -1,
      sellPriceTaxIncluded: -1,
      catalogPage: -1,
      dimensions: '',
      weight: '-1',
      year: '',
      quantity: -1,
      featured: false,
      reserved: false,
      imagesLinks: [],
    },
    picture: null,
    saving: false,
    alertVisible: false,
    alertMessage: '',
    fieldsStatus: {},
  };

  componentDidMount() {
    if (this.props.defaultArtpiece) {
      this.setState({
        artPiece: this.props.defaultArtpiece,
      });
    }
  }
  change(e: SyntheticInputEvent<>) {
    console.log(e);
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        artPiece: { ...this.state.artPiece, [e.target.id]: e.target.value },
      });
    }
  }
  handleAlertDismiss = () => {
    this.setState({
      alertVisible: false,
      alertMessage: '',
    });
  };

  handleAlertShow = (errorMessage: string) => {
    this.setState({ alertVisible: true, alertMessage: errorMessage });
  };

  styles() {
    return {
      select: {
        maxHeight: '10em',
      },
      progress: {
        position: 'absolute',
      },
    };
  }

  getWrongFields = () => {
    const fieldsStatus = this.state.fieldsStatus;
    let wrongFields: string[] = [];
    for (let property in fieldsStatus) {
      if (fieldsStatus.hasOwnProperty(property)) {
        if (!fieldsStatus[property]) {
          wrongFields = [...wrongFields, property];
        }
      }
    }
    return wrongFields;
  };

  onSubmit = async (e: SyntheticInputEvent<>) => {
    e.preventDefault();
    this.setState({
      saving: true,
    });
    const wrongFields = this.getWrongFields();

    if (!wrongFields.length) {
      if (this.state.picture) {
        const imageLink = await uploadPictureToFirebase(this.state.picture);
        if (imageLink) {
          this.setState({
            artPiece: { ...this.state.artPiece, imagesLinks: [imageLink] },
          });
        } else {
          this.handleAlertShow(
            "La sauvegarde de la photo de l'oeuvre a écouhé. Veuillez rééssayer."
          );
          this.setState({
            saving: false,
          });
          return;
        }
      }
      let firebaseResponse;
      if (this.props.defaultArtpiece) {
        firebaseResponse = await updateArtPieceToFirebase(this.state.artPiece);
      } else {
        firebaseResponse = await addArtPieceToFirebase(this.state.artPiece);
      }
      if (firebaseResponse && firebaseResponse.committed) {
        this.setState({
          artPiece: {
            id: '',
            galeryId: '',
            reference: '',
            name: '',
            artistId: '',
            description: '',
            typeOfArtPieces: '',
            buyPriceTaxFree: -1,
            buyPriceTaxIncluded: -1,
            sellPriceTaxFree: -1,
            sellPriceTaxIncluded: -1,
            catalogPage: -1,
            dimensions: '',
            weight: '-1',
            year: '',
            quantity: -1,
            featured: false,
            reserved: false,
            imagesLinks: [],
          },
          picture: null,
        });
      } else {
        this.handleAlertShow(firebaseResponse.message);
      }
    } else {
      this.handleAlertShow(`Champs manquants: ${wrongFields.join(', ')}`);
    }
    this.setState({ saving: false });
  };

  handleChangeArtistId = (event: SyntheticInputEvent<>) => {
    this.setState({
      artPiece: { ...this.state.artPiece, artistId: event.target.value },
    });
  };

  handleChangeArtTypeId = (event: SyntheticInputEvent<>) => {
    this.setState({
      artPiece: { ...this.state.artPiece, typeOfArtPieces: event.target.value },
    });
  };

  renderArtistsChoices: (
    artist: ArtistType[]
  ) => Element<any>[] | void = artists => {
    if (artists) {
      return artists.map(artist => (
        <option value={artist.id} key={artist.id}>
          {artist.name}
        </option>
      ));
    }
  };

  computeArtTypesOptions: (
    arttypes: ArtTypeType[]
  ) => Element<any>[] | void = arttypes => {
    if (arttypes) {
      return arttypes.map(arttype => (
        <option value={arttype.id} key={arttype.id}>
          {arttype.name}
        </option>
      ));
    }
  };

  onImageChange = (event: SyntheticInputEvent<>) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        picture: event.target.files[0],
      });
    }
  };

  validateFormField = (predicate: boolean, fieldLabel: string) => {
    this.state.fieldsStatus[fieldLabel] = predicate;
    if (predicate) {
      return 'success';
    } else {
      return 'error';
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
              this.state.artPiece.reference !== '',
              'Référence'
            )}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />
          <FieldGroup
            id="name"
            type="text"
            label="Nom de l'oeuvre"
            placeholder="Kong résine rouge"
            value={this.state.artPiece.name}
            validationState={this.validateFormField(
              this.state.artPiece.name !== '',
              "Nom de l'oeuvre"
            )}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />

          <FieldGroup
            id="artistId"
            label="Artiste"
            placeholder="Selectionner l'artiste"
            validationState={this.validateFormField(
              this.state.artPiece.artistId !== '',
              'Artiste'
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
              this.state.artPiece.typeOfArtPieces !== '',
              "Type de l'oeuvre"
            )}
            componentClass="select"
            onChange={e => this.handleChangeArtTypeId(e)}
            selectOptions={this.computeArtTypesOptions(this.props.arttypes)}
          />

          <FieldGroup
            id="description"
            label="Description"
            type="text"
            value={this.state.artPiece.description}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />

          <FieldGroup
            id="buyPriceTaxFree"
            label="Prix d'achat (HT)"
            type="text"
            value={this.state.artPiece.buyPriceTaxFree}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />
          <FieldGroup
            id="buyPriceTaxIncluded"
            label="Prix d'achat (TTC)"
            type="text"
            value={this.state.artPiece.buyPriceTaxIncluded}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />

          <FieldGroup
            id="sellPriceTaxFree"
            label="Prix de vente (HT)"
            type="text"
            value={this.state.artPiece.sellPriceTaxFree}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />
          <FieldGroup
            id="sellPriceTaxIncluded"
            label="Prix de vente (TTC)"
            type="text"
            validationState={this.validateFormField(
              this.state.artPiece.sellPriceTaxIncluded > 0,
              'Prix de vente (TTC)'
            )}
            value={this.state.artPiece.sellPriceTaxIncluded}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />
          <FieldGroup
            id="catalogPage"
            label="Page du catalogue"
            type="text"
            value={this.state.artPiece.catalogPage}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />
          <FieldGroup
            id="dimensions"
            label="Dimensions"
            type="text"
            value={this.state.artPiece.dimensions}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />
          <FieldGroup
            id="weight"
            label="Poids"
            type="text"
            value={this.state.artPiece.weight}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />
          <FieldGroup
            id="year"
            label="Année"
            type="text"
            value={this.state.artPiece.year}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
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
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />

          <FieldGroup
            id="picture"
            type="file"
            label="Photo"
            validationState={this.validateFormField(
              this.state.picture !== '' || this.state.picture !== null,
              'Photo'
            )}
            onChange={(e: SyntheticInputEvent<>) => this.onImageChange(e)}
          />

          <Checkbox
            checked={this.state.artPiece.featured}
            onChange={e =>
              this.setState({
                artPiece: {
                  ...this.state.artPiece,
                  featured: !this.state.artPiece.featured,
                },
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
                  reserved: !this.state.artPiece.reserved,
                },
              })
            }
          >
            Oeuvre marquée comme "Réservée"
          </Checkbox>
          <MyAlert
            visible={this.state.alertVisible}
            message={this.state.alertMessage}
            alertDissmiss={this.handleAlertDismiss}
          />
          <Button
            variant="raised"
            onClick={(e: SyntheticInputEvent<>) => this.onSubmit(e)}
          >
            Confirmer
          </Button>
          <ConditionalCircularProgress predicate={this.state.saving} />
        </form>
      </div>
    );
  }
}
