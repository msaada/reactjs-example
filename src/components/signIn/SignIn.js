// @flow

import Divider from 'material-ui/Divider';
import React, { Component } from 'react';
import '../../css/App.css';
import {
  addUserExtraInfosToFirebase,
  auth,
} from '../../javascript/firebaseUtils';
import Footer from '../common/Footer';
import Header from '../common/Header';
import MyAlert from '../common/MyAlert';
import { SignInForm } from './SignInForm';

import type { UserType, FirebaseUser } from '../../types/types';

type Props = {};
type State = {
  extraInfos: {
    id: string,
    user: ?FirebaseUser,
    name: string,
    email: string,
    password: string,
    address: string,
    postalCode: string,
    city: string,
    phoneNumber: string,
    clientCode: string,
  },
  alertVisible: boolean,
  alertMessage: string,
};

class SignIn extends Component<Props, State> {
  state: State = {
    extraInfos: {
      id: '',
      user: null,
      name: '',
      email: '',
      password: '',
      address: '',
      postalCode: '',
      city: '',
      phoneNumber: '',
      clientCode: '',
    },
    alertVisible: false,
    alertMessage: '',
  };

  componentDidMount = () => {};

  change = (e: SyntheticInputEvent<>) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        extraInfos: {
          ...this.state.extraInfos,
          [e.target.id]: e.target.value,
        },
      });
    }
  };

  signIn = async (userInfos: UserType) => {
    if (auth) {
      await auth
        .createUserWithEmailAndPassword(
          this.state.extraInfos.email,
          this.state.extraInfos.password
        )
        .then(() => (window.location = '/'))
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code;

          let frenchErrorMessage: string;

          if (errorCode === 'auth/email-already-in-use') {
            frenchErrorMessage =
              'Cette adresse mail est déjà liée à un compte.';
          } else if (errorCode === 'auth/invalid-email') {
            frenchErrorMessage = 'Cette adresse mail est mal formatée.';
          } else {
            frenchErrorMessage = `Une erreur inconnue est survenue (${errorCode})`;
          }
          this.handleAlertShow(frenchErrorMessage);
        });
      await auth.onAuthStateChanged(async (user: FirebaseUser) => {
        addUserExtraInfosToFirebase(user.uid, this.state.extraInfos);
      });
    }
  };

  handleAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  handleAlertShow = (errorMessage: string) => {
    this.setState({ alertVisible: true, alertMessage: errorMessage });
  };

  styles = () => {
    return {
      root: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
      },
      divider: {
        marginBottom: '2em',
      },
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      buttons: {
        display: 'flex',
        justifyContent: 'flex-start',
      },
    };
  };
  render() {
    return (
      <div>
        <Header />
        <div className="body" style={this.styles().root}>
          <div style={this.styles().centered}>
            <h1>Créer un compte</h1>
          </div>
          <Divider style={this.styles().divider} />
          <MyAlert
            visible={this.state.alertVisible}
            message={this.state.alertMessage}
            alertDissmiss={this.handleAlertDismiss}
          />
          <SignInForm
            signIn={this.signIn}
            email={this.state.extraInfos.email}
            password={this.state.extraInfos.password}
            name={this.state.extraInfos.name}
            address={this.state.extraInfos.address}
            postalCode={this.state.extraInfos.postalCode}
            city={this.state.extraInfos.city}
            phoneNumber={this.state.extraInfos.phoneNumber}
            clientCode={this.state.extraInfos.clientCode}
            emailChange={this.change}
            passwordChange={this.change}
            nameChange={this.change}
            addressChange={this.change}
            postalCodeChange={this.change}
            cityChange={this.change}
            phoneNumberChange={this.change}
            clientCodeChange={this.change}
          />
        </div>

        <Footer />
      </div>
    );
  }
}

export default SignIn;
