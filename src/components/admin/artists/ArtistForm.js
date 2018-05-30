//@flow

import Button from 'material-ui/Button';
import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import {
  addArtistToFirebase,
  updateArtist,
  uploadPictureToFirebase,
} from '../../../javascript/firebaseUtils';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import { FieldGroup } from '../../common/FieldGroup';
import MyAlert from '../../common/MyAlert';

import type { ArtistType } from '../../../types/types';

type Props = {
  defaultArtist: ?ArtistType,
};

type State = {
  artist: ArtistType,
  logoFile: ?File,
  pictureFile: ?File,
  alertVisible: boolean,
  alertMessage: string,
  saving: boolean,
  fieldsStatus: { [string]: boolean },
};

export default class ArtistForm extends Component<Props, State> {
  state = {
    artist: {
      id: '',
      name: '',
      picture: '',
      description: '',
      logo: '',
      typeOfArtPieces: '',
      featured: false,
    },
    pictureFile: null,
    logoFile: null,
    alertVisible: false,
    alertMessage: '',
    saving: false,
    fieldsStatus: {},
  };

  componentDidMount() {
    if (this.props.defaultArtist) {
      this.setState({
        artist: this.props.defaultArtist,
      });
    }
  }

  change(e: SyntheticInputEvent<>) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        artist: { ...this.state.artist, [e.target.id]: e.target.value },
      });
    }
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

  onSubmit = async (e: SyntheticInputEvent<>) => {
    e.preventDefault();
    this.setState({
      saving: true,
    });

    const wrongFields = this.getWrongFields();
    if (!wrongFields.length) {
      const { logoFile } = this.state;
      if (this.state.artist.logo === '' && logoFile) {
        const logoUrl = await uploadPictureToFirebase(logoFile);
        console.log(logoUrl);
        if (logoUrl) {
          this.setState({
            artist: { ...this.state.artist, logo: logoUrl },
          });
        } else {
          this.handleAlertShow(
            "La sauvegarde du logo de l'artiste a échoué. Veuillez rééssayer."
          );
          this.setState({
            saving: false,
          });
          return;
        }
      }

      if (this.state.artist.picture === '' && this.state.pictureFile) {
        const pictureUrl = await uploadPictureToFirebase(
          this.state.pictureFile
        );
        console.log(pictureUrl);

        if (pictureUrl) {
          this.setState({
            artist: { ...this.state.artist, picture: pictureUrl },
          });
        } else {
          this.handleAlertShow(
            "La sauvegarde de la photo de l'artiste a échoué. Veuillez rééssayer."
          );
          this.setState({
            saving: false,
          });
          return;
        }
      }

      let firebaseResponse;
      if (this.props.defaultArtist) {
        firebaseResponse = await updateArtist(this.state.artist);
        console.log('firebase response:', firebaseResponse);
      } else {
        firebaseResponse = await addArtistToFirebase(this.state.artist);
      }
      if (firebaseResponse && !firebaseResponse.committed) {
        this.handleAlertShow(firebaseResponse.message);
      } else {
        this.setState({
          artist: {
            id: '',
            name: '',
            picture: '',
            description: '',
            logo: '',
            typeOfArtPieces: '',
            featured: false,
          },
          pictureFile: null,
          logoFile: null,
        });
      }
    } else {
      this.handleAlertShow(`Champs manquants: ${wrongFields.join(', ')}`);
    }
    this.setState({
      saving: false,
    });
  };

  handleAlertDismiss = () => {
    this.setState({
      alertVisible: false,
      alertMessage: '',
    });
  };

  handleAlertShow = (errorMessage: string) => {
    this.setState({ alertVisible: true, alertMessage: errorMessage });
  };

  validateFormField = (predicate: boolean, fieldLabel: string) => {
    this.state.fieldsStatus[fieldLabel] = predicate;
    if (predicate) {
      return 'success';
    } else {
      return 'error';
    }
  };

  onImageChange = (event: SyntheticInputEvent<>, logo: boolean) => {
    if (event.target.files && event.target.files[0]) {
      if (logo) {
        this.setState({
          logoFile: event.target.files[0],
        });
      } else {
        this.setState({
          pictureFile: event.target.files[0],
        });
      }
    }
  };

  render() {
    return (
      <div>
        <form noValidate>
          <FieldGroup
            id="name"
            type="text"
            label="Nom de l'artiste"
            value={this.state.artist.name}
            validationState={this.validateFormField(
              this.state.artist.name !== '',
              "Nom de l'artiste"
            )}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />

          <FieldGroup
            id="photo"
            type="file"
            label="Photo "
            validationState={this.validateFormField(
              this.state.artist.picture !== '' ||
                this.state.pictureFile !== null,
              'Photo'
            )}
            onChange={(e: SyntheticInputEvent<>) =>
              this.onImageChange(e, false)
            }
          />

          <FieldGroup
            id="logo"
            type="file"
            label="Logo"
            validationState={this.validateFormField(
              this.state.artist.logo !== '' || this.state.logoFile !== null,
              'Logo'
            )}
            onChange={(e: SyntheticInputEvent<>) => this.onImageChange(e, true)}
          />

          <FieldGroup
            id="description"
            type="text"
            label="Biographie de l'artiste"
            value={this.state.artist.description}
            validationState={this.validateFormField(
              this.state.artist.description !== '',
              "Biographie de l'artiste"
            )}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
          />

          <Checkbox
            id="featured"
            checked={this.state.artist.featured}
            onChange={e =>
              this.setState({
                artist: {
                  ...this.state.artist,
                  featured: !this.state.artist.featured,
                },
              })
            }
          >
            Artiste dans la rubrique "Artiste du moment"
          </Checkbox>

          {this.state.alertVisible && (
            <MyAlert
              message={this.state.alertMessage}
              alertDissmiss={this.handleAlertDismiss}
            />
          )}
          <Button
            raised
            onClick={(e: SyntheticInputEvent<>) => this.onSubmit(e)}
          >
            Sauvegarder
          </Button>
          <ConditionalCircularProgress predicate={this.state.saving} />
        </form>
      </div>
    );
  }
}
