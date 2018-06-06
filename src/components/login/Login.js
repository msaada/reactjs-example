// @flow

import * as firebase from 'firebase';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import React, { Component } from 'react';
import '../../css/App.css';
import { auth, getCurrentUser } from '../../javascript/firebaseUtils';
import Footer from '../common/Footer';
import Header from '../common/Header';
import MyAlert from '../common/MyAlert';
import TextFieldControlled from '../common/TextFieldControlled';
import type { FirebaseUser } from '../../types/types';

type Props = {};
type State = {
  user: ?FirebaseUser,
  email: string,
  password: string,
  alertVisible: boolean,
  alertMessage: string,
};
class Login extends Component<Props, State> {
  state: State = {
    user: null,
    email: '',
    password: '',
    alertVisible: false,
    alertMessage: '',
  };

  componentDidMount = () => {
    const user = getCurrentUser();
    if (user) {
      this.setState({
        user: user,
      });
    }
  };

  logIn = async () => {
    if (auth) {
      await auth
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return auth.signInWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
        })
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code;

          let frenchErrorMessage: string;
          if (errorCode === 'auth/invalid-email') {
            frenchErrorMessage = "L'adresse mail est mal formatée.";
          } else if (errorCode === 'auth/wrong-password') {
            frenchErrorMessage = 'Mot de passe erroné';
          } else if (errorCode === 'auth/user-not-found') {
            frenchErrorMessage =
              "Cette addresse mail n'est réliée à aucun compte. Veuillez créer un compte avant de pouvoir vous authentifier.";
          } else {
            frenchErrorMessage = `Une erreur inconnue est survenue (${errorCode})`;
          }
          this.handleAlertShow(frenchErrorMessage);
        });

      const user = await getCurrentUser();
      if (user) {
        this.setState({
          user: user,
        });
        console.log(user);
        window.location.href = '/';
      }
    }
  };

  handleEmailChange = (event: SyntheticInputEvent<>) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        email: event.target.value,
      });
    }
  };

  handlePasswordChange = (event: SyntheticInputEvent<>) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        password: event.target.value,
      });
    }
  };

  signIn = async () => {
    if (auth) {
      await auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code;

          let frenchErrorMessage: string;

          if (errorCode === 'auth/email-already-in-use') {
            frenchErrorMessage =
              'Cette adresse mail est déjà liée à un compte.';
          } else {
            frenchErrorMessage = `Une erreur inconnue est survenue (${errorCode})`;
          }

          this.handleAlertShow(frenchErrorMessage);
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
            <h1>Connexion</h1>
          </div>
          <Divider style={this.styles().divider} />
          <MyAlert
            visible={this.state.alertVisible}
            message={this.state.alertMessage}
            alertDissmiss={this.handleAlertDismiss}
          />
          <TextFieldControlled
            id="email-field"
            floatingLabelText="Email"
            type="text"
            value={this.state.email}
            handleChange={this.handleEmailChange}
          />

          <TextFieldControlled
            id="password-field"
            floatingLabelText="Mot de passe"
            type="password"
            value={this.state.password}
            handleChange={this.handlePasswordChange}
          />
          <br />
          <div style={this.styles().buttons}>
            <Button
              id="login-button"
              variant="raised"
              keyboardFocused
              onClick={e => this.logIn()}
            >
              Connexion
            </Button>
            <Button href="/creercompte">Je n'ai pas de compte</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
