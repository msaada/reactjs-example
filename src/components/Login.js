// @flow

import React, { Component } from "react";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import RaisedButton from "material-ui/RaisedButton";
import TextFieldControlled from "./TextFieldControlled";

import { browserHistory } from "react-router";

import { auth, getUserExtraInfos } from "../javascript/firebaseUtils";

class Login extends Component {
  state: {
    user: any,
    email: string,
    password: string,
    showAdminPanel: boolean
  };

  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      email: "",
      password: "",
      showAdminPanel: false
    };
  }

  componentDidMount = () => {
    this.getCurrentUser();
  };

  routeToNextScreen = (user: any) => {
    if (user) {
      if (this.state.showAdminPanel) {
        browserHistory.push("/admin");
      } else {
        browserHistory.push("/");
      }
    }
  };

  setAdmin = (userInfos: any) => {
    this.setState({
      ...this.state,
      showAdminPanel: userInfos.isAdmin
    });
    console.log(this.state);
    this.routeToNextScreen();
  };

  getCurrentUser = async () => {
    if (auth) {
      const user = await auth.currentUser;

      if (user) {
        // User is signed in.
        console.log("Heyy");
        this.setState({
          ...this.state,
          user: user
        });
        getUserExtraInfos(user.uid, this.setAdmin);
      } else {
        // No user is signed in.
        console.log("Hayy");
      }
    }
  };

  login = async () => {
    if (auth) {
      await auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(errorCode);
          console.log(errorMessage);
        });
      await this.getCurrentUser();
    }
  };

  handleEmailChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        ...this.state,
        email: event.target.value
      });
    }
  };

  handlePasswordChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        ...this.state,
        password: event.target.value
      });
    }
  };

  logout = async () => {
    if (auth) {
      await auth.signOut();
      this.setState({
        ...this.state,
        user: null
      });
    }
  };

  render() {
    const { user } = this.state;

    return (
      <div className="Login">
        <Header />
        <div className="app">
          <p>{user ? `Hi, ${user.email}!` : "Hi!"}</p>
          <TextFieldControlled
            id="email-field"
            hintText="Email field"
            floatingLabelText="Email"
            type="text"
            value={this.state.email}
            handleChange={this.handleEmailChange}
          />

          <TextFieldControlled
            id="password-field"
            hintText="Password Field"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            handleChange={this.handlePasswordChange}
          />
          <br />
          <RaisedButton onClick={this.login.bind(this)}>Login</RaisedButton>

          <RaisedButton onClick={this.logout.bind(this)}>Logout</RaisedButton>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
