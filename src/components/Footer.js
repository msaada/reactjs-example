//@flow
import React, { Component } from "react";
import logo from "../assets/Art-Gallery-Logo.jpg";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import { Image } from "react-bootstrap";
import { browserHistory } from "react-router";

class Footer extends Component {
  styles() {
    return {
      root: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "2em",
        marginBottom: "1em",
        height: "5em"
      },
      nav_buttons: {
        display: "flex",
        justifyContent: "flex-end"
      },
      logo: {
        height: "80%",
        width: "auto",
        marginBottom: "1em",
        float: "left"
      },
      padding: {
        height: "3em"
      },
      nav_div: {
        flexGrow: "1"
      }
    };
  }

  render() {
    return (
      <div style={this.styles().root}>
        <Image
          src={logo}
          onClick={e => browserHistory.push("/")}
          style={this.styles().logo}
          alt="Mega Dental concept store Art Gallery"
        />
        <div style={this.styles().nav_div}>
          <div style={this.styles().padding} />
          <Divider />
          <div style={this.styles().nav_buttons}>
            <FlatButton
              label="À propos"
              hoverColor="#ff7e17"
              onClick={() => browserHistory.push("/azerty")}
            />
            <FlatButton
              hoverColor="#ff7e17"
              label="Conditions Générales de Ventes"
              onClick={() => browserHistory.push("/azerty")}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
