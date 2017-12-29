// @flow

import React, { Component } from "react";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import Divider from "material-ui/Divider";
import MyAlert from "./MyAlert";
import { SignInForm } from "./SignInForm";

import type { UserType } from "../types/types";

import { auth, addUserExtraInfosToFirebase } from "../javascript/firebaseUtils";

class SignIn extends Component {
  state: {
    id: string,
    user: any,
    name: string,
    email: string,
    password: string,
    address: string,
    postalCode: string,
    city: string,
    phoneNumber: string,
    clientCode: ?string,
    alertVisible: boolean,
    alertMessage: string
  } = {
    id: "",
    user: null,
    name: "",
    email: "",
    password: "",
    address: "",
    postalCode: "",
    city: "",
    phoneNumber: "",
    clientCode: "",
    alertVisible: false,
    alertMessage: ""
  };

  componentDidMount = () => {};

  change = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  };

  signIn = async (userInfos: UserType) => {
    if (auth) {
      await auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code;

          let frenchErrorMessage: string;

          if (errorCode === "auth/email-already-in-use") {
            frenchErrorMessage =
              "Cette adresse mail est déjà liée à un compte.";
          } else if (errorCode === "auth/invalid-email") {
            frenchErrorMessage = "Cette adresse mail est mal formatée.";
          } else {
            frenchErrorMessage = `Une erreur inconnue est survenue (${errorCode})`;
          }
          this.handleAlertShow(frenchErrorMessage);
        });
      await auth.onAuthStateChanged(async user => {
        addUserExtraInfosToFirebase(user.uid, this.state);
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
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column"
      },
      divider: {
        marginBottom: "2em"
      },
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      buttons: {
        display: "flex",
        justifyContent: "flex-start"
      }
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
          {this.state.alertVisible && (
            <MyAlert
              message={this.state.alertMessage}
              alertDissmiss={this.handleAlertDismiss}
            />
          )}
          <SignInForm
            signIn={this.signIn}
            email={this.state.email}
            password={this.state.password}
            name={this.state.name}
            address={this.state.address}
            postalCode={this.state.postalCode}
            city={this.state.city}
            phoneNumber={this.state.phoneNumber}
            clientCode={this.state.clientCode}
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
