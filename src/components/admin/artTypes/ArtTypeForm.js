//@flow

import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import {
  addArtTypeToFirebase,
  updateArtTypeInFirebase,
} from '../../../javascript/firebaseUtils';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import { FieldGroup } from '../../common/FieldGroup';
import MyAlert from '../../common/MyAlert';

import type { ArtTypeType } from '../../../types/types';

type Props = {
  defaultArtType: ?ArtTypeType,
};

type State = {
  artType: ArtTypeType,
  alertVisible: boolean,
  alertMessage: string,
  saving: boolean,
  fieldsStatus: { [string]: boolean },
};

export default class ArtTypeForm extends Component<Props, State> {
  state = {
    artType: {
      id: '',
      name: '',
      picture: '',
    },
    saving: false,
    alertVisible: false,
    alertMessage: '',
    fieldsStatus: {
      Nom: false,
    },
  };
  componentDidMount() {
    if (this.props.defaultArtType) {
      this.setState({
        artType: this.props.defaultArtType,
      });
    }
  }
  change(e: SyntheticInputEvent<>) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        artType: { ...this.state.artType, [e.target.id]: e.target.value },
      });
    }
  }

  checkFields(arttype: ArtTypeType) {
    return arttype.name;
  }

  async onSubmit(e: SyntheticInputEvent<>) {
    e.preventDefault();
    this.setState({
      saving: true,
    });
    const wrongFields = this.getWrongFields();

    if (!wrongFields.length) {
      let firebaseResponse;
      if (this.props.defaultArtType) {
        firebaseResponse = await updateArtTypeInFirebase(this.state.artType);
      } else {
        firebaseResponse = await addArtTypeToFirebase(this.state.artType);
      }

      if (firebaseResponse && !firebaseResponse.committed) {
        this.handleAlertShow(firebaseResponse.message);
      } else {
        this.setState({
          artType: {
            name: '',
            id: '',
            picture: '',
          },
        });
      }
    } else {
      this.handleAlertShow(`Champs manquants: ${wrongFields.join(', ')}`);
    }
    this.setState({
      saving: false,
    });
  }

  handleAlertDismiss = () => {
    this.setState({
      alertVisible: false,
      alertMessage: '',
    });
  };

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

  handleAlertShow = (errorMessage: string) => {
    this.setState({ alertVisible: true, alertMessage: errorMessage });
  };

  validateFormField = (predicate: boolean, fieldLabel: string) => {
    // this.setState((prevState, props) => {
    //   return {
    //     fieldsStatus: {
    //       ...prevState.fieldsStatus,
    //       fieldLabel: predicate,
    //     },
    //   };
    // });
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
            id="name"
            label="Nom"
            type="text"
            value={this.state.artType.name}
            onChange={(e: SyntheticInputEvent<>) => this.change(e)}
            validationState={this.validateFormField(
              this.state.artType.name !== '',
              'Nom'
            )}
          />
          <MyAlert
            visible={this.state.alertVisible}
            message={this.state.alertMessage}
            alertDissmiss={this.handleAlertDismiss}
          />
          <Button variant="raised" onClick={e => this.onSubmit(e)}>
            Sauvegarder
          </Button>

          <ConditionalCircularProgress predicate={this.state.saving} />
        </form>
      </div>
    );
  }
}
