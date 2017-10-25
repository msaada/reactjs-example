//@flow
import React, { Component } from "react";
import logo from "../assets/Art-Gallery-Logo.jpg";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";

class Footer extends Component {
  render() {
    const style = {
      root: {
        display: "flex",
        justifyContent: "flex-end"
      },
      logo: {
        height: "auto",
        width: "20em",
        float: "left"
      }
    };
    return (
      <div>
        <Divider />
        <br />
        <div className="App-footer">
          <img
            src={logo}
            style={style.logo}
            className="App-logo"
            alt="Mega Dental concept store Art Gallery"
          />
        </div>
        <div style={style.root}>
          <FlatButton label="Conditions générales de Ventes" />
          <FlatButton label="A propos" />
        </div>
      </div>
    );
  }
}

export default Footer;
