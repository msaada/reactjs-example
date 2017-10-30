//@flow
import React, { Component } from "react";
import { browserHistory } from "react-router";

import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";

import { Image } from "react-bootstrap";

import logo from "../assets/Art-Gallery-Logo.jpg";
import { categories } from "../datas/categories";

class Header extends Component {
  styles() {
    return {
      root: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1em",
        height: "5em",
        marginBottom: "2em"
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
              label="Peinture"
              hoverColor="#ff7e17"
              onClick={() => browserHistory.push(categories.peinture.url)}
            />
            <FlatButton
              label="Gravure"
              hoverColor="#ff7e17"
              onClick={() => browserHistory.push(categories.gravure.url)}
            />
            <FlatButton
              hoverColor="#ff7e17"
              label="Sculpture"
              onClick={() => browserHistory.push(categories.sculpture.url)}
            />
            <FlatButton
              hoverColor="#ff7e17"
              label="Meuble"
              onClick={() => browserHistory.push(categories.meuble.url)}
            />
            <FlatButton
              hoverColor="#ff7e17"
              label="Photographie"
              onClick={() => browserHistory.push(categories.photographie.url)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
