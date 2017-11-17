// @flow

import React, { Component } from "react";

import "../css/App.css";

import Paper from "material-ui/Paper";
import { CircularProgress } from "material-ui/Progress";
import AppBar from "material-ui/AppBar";

import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import AddArtistDialog from "./AddArtistDialog";
import AddArtPieceDialog from "./AddArtPieceDialog";
import AddArtTypeDialog from "./AddArtTypeDialog";

import type { ArtistType, ArtPieceType, ArtTypeType } from "../types/types";
import AdminList from "./adminList";
import {
  getLastArtist,
  getLastArtPiece,
  getLastArtType
} from "../javascript/firebaseUtils";

class Admin extends Component {
  state: {
    artists: Array<ArtistType>,
    artPieces: Array<ArtPieceType>,
    artTypes: Array<ArtTypeType>
  } = {
    artists: [],
    artPieces: [],
    artTypes: []
  };

  updateArtPiece = (artpiece: ArtPieceType) => {
    this.setState({
      artPieces: [...this.state.artPieces, artpiece]
    });
  };

  updateArtist = (artist: ArtistType) => {
    this.setState({
      artists: [...this.state.artists, artist]
    });
  };
  updateArtType = (artType: ArtTypeType) => {
    this.setState({
      artTypes: [...this.state.artTypes, artType]
    });
  };
  componentDidMount() {
    // TODO: if user is not authenticated go to Login

    getLastArtist(this.updateArtist);
    getLastArtPiece(this.updateArtPiece);
    getLastArtType(this.updateArtType);
  }
  styles() {
    return {
      root: {
        display: "flex",
        flexDirection: "column"
      },
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      paper: {
        padding: 20
      }
    };
  }
  render() {
    return (
      <div style={this.styles().root}>
        <AppBar>
          <Toolbar>
            <Typography type="display2" color="inherit">
              Panneau d'administration
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <br />
        <br />
        <br />
        <Paper elevation={3} style={this.styles().paper}>
          <Toolbar>
            <Typography type="display3">Artistes</Typography>
          </Toolbar>

          <div style={this.styles().centered}>
            {!this.state.artists.length && <CircularProgress size={90} />}
          </div>
          {this.state.artists.length && (
            <AdminList artists={this.state.artists} />
          )}

          <AddArtistDialog />
        </Paper>
        <br />
        <br />

        <Paper elevation={3} style={this.styles().paper}>
          <Toolbar>
            <Typography type="display3">Oeuvres</Typography>
          </Toolbar>

          <div style={this.styles().centered}>
            {!this.state.artPieces.length && <CircularProgress size={90} />}
          </div>
          {this.state.artPieces.length && (
            <AdminList artpieces={this.state.artPieces} />
          )}
          <AddArtPieceDialog />
        </Paper>

        <br />
        <br />
        <Paper elevation={3} style={this.styles().paper}>
          <Toolbar>
            <Typography type="display3">Types d'oeuvres</Typography>
          </Toolbar>
          <div style={this.styles().centered}>
            {!this.state.artTypes.length && <CircularProgress size={90} />}
          </div>
          {this.state.artTypes.length && (
            <AdminList arttypes={this.state.artTypes} />
          )}
          <AddArtTypeDialog />
        </Paper>
      </div>
    );
  }
}

export default Admin;
