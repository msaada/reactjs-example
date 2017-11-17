//@flow
import React, { Component } from "react";
import logo from "../assets/Art-Gallery-Logo.jpg";
import Divider from "material-ui/Divider";
import Button from "material-ui/Button";
import { Image } from "react-bootstrap";

class Footer extends Component {
  styles() {
    return {
      root: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "5em",
        marginBottom: "2em",
        height: "5em"
      },
      nav_buttons: {
        display: "flex",
        justifyContent: "flex-end"
      },
      logo: {
        height: "50%",
        width: "auto"
      },
      padding: {
        height: "2em"
      },
      nav_div: {
        flexGrow: "1"
      },
      button: {
        fontFamily: "Din"
      }
    };
  }

  render() {
    return (
      <div style={this.styles().root}>
        <Image
          src={logo}
          onClick={e => (window.location.href = "/")}
          style={this.styles().logo}
          alt="Mega Dental concept store Art Gallery"
        />
        <div style={this.styles().nav_div}>
          <div style={this.styles().padding} />
          <Divider />
          <div style={this.styles().nav_buttons}>
            <Button style={this.styles().button} href="/apropos">
              À propos
            </Button>
            <Button
              style={this.styles().button}
              href="http://www.megadental.fr/pdf/cgv-10-11.pdf"
            >
              Conditions Générales de Ventes
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
