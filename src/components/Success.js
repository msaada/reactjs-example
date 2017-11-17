// @flow
import React, { Component } from "react";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import Divider from "material-ui/Divider";

import { Image } from "react-bootstrap";
import Button from "material-ui/Button";

class Success extends Component {
  styles() {
    return {
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      button: {
        fontFamily: "Din"
      },
      divider: {
        marginBottom: "1em"
      },
      mega: {
        height: "2rem",
        width: "auto"
      }
    };
  }

  render = () => {
    return (
      <div>
        <Header />

        <div className="body">
          <h1>Félicitation !</h1>
          <Divider style={this.styles().divider} />

          <p>
            Un conseiller va vous contacter dans les plus bref délais pour
            finaliser votre commande.
          </p>
          <Button raised href={"/"} style={this.styles().button}>
            Retourner à l'acceuil
          </Button>
          <Button style={this.styles().button} href="http://www.megadental.fr">
            Retour vers
            <Image
              src={require("../assets/MEGA-DENTAL-logo.png")}
              alt={"Megadental logo"}
              style={this.styles().mega}
              onClick={e => (window.location.href = "http://www.megadental.fr")}
            />
          </Button>
        </div>

        <Footer />
      </div>
    );
  };
}

export default Success;
