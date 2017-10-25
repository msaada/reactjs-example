//@flow
import React, { Component } from "react";
import { browserHistory } from "react-router";

import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";

import logo from "../assets/Art-Gallery-Logo.jpg";

class Header extends Component {
  styles = () => {
    return {
      root: {
        height: "5em",
        color: "white",
        marginTop: "5em"
      },
      nav_buttons: {
        display: "flex",
        justifyContent: "flex-end"
      },
      logo: {
        height: "auto",
        width: "20em",
        float: "left"
      }
    };
  };
  render() {
    return (
      <div>
        <div style={this.styles().root}>
          <img
            src={logo}
            style={this.styles().logo}
            alt="Mega Dental concept store Art Gallery"
          />
          <div style={this.styles().nav_buttons}>
            <FlatButton
              label="Connexion"
              onClick={() => browserHistory.push("/login")}
            />
            <FlatButton
              label="Inscription"
              onClick={() => browserHistory.push("/sign-up")}
            />
            <FlatButton
              href=""
              icon={<FontIcon className="muidocs-icon-custom-github" />}
              label="Panier"
            />
          </div>
        </div>
        <Divider />
      </div>
    );
  }
}

export default Header;
