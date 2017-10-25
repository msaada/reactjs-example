// @flow

import React, { Component } from "react";

import "../css/App.css";

import Paper from "material-ui/Paper";
import CircularProgress from "material-ui/CircularProgress";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";

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
    artTypes: Array<ArtTypeType>,
    isLoadingArtists: boolean,
    isLoadingArtPieces: boolean,
    isLoadingArtTypes: boolean
  };
  constructor(props: any) {
    super(props);
    this.state = {
      artists: [],
      artPieces: [],
      artTypes: [],
      isLoadingArtists: true,
      isLoadingArtPieces: true,
      isLoadingArtTypes: true
    };
  }

  updateArtPiece = (artpiece: ArtPieceType) => {
    this.setState({
      ...this.state,
      isLoadingArtPieces: false,
      artPieces: [...this.state.artPieces, artpiece]
    });
  };

  updateArtist = (artist: ArtistType) => {
    this.setState({
      ...this.state,
      isLoadingArtists: false,
      artists: [...this.state.artists, artist]
    });
  };
  updateArtType = (artType: ArtTypeType) => {
    this.setState({
      ...this.state,
      isLoadingArtTypes: false,
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
      <div>
        <AppBar
          title="Panneau d'administration"
          iconElementLeft={<IconButton />}
        />
        <Paper style={this.styles().paper}>
          <AppBar title="Artistes" iconElementLeft={<IconButton />} />
          <div style={this.styles().centered}>
            {this.state.isLoadingArtists && (
              <CircularProgress size={90} thickness={7} />
            )}
          </div>
          {!this.state.isLoadingArtists && (
            <AdminList artists={this.state.artists} />
          )}

          <AddArtistDialog />
        </Paper>
        <br />

        <Paper style={this.styles().paper}>
          <AppBar title="Oeuvres" iconElementLeft={<IconButton />} />
          <div style={this.styles().centered}>
            {this.state.isLoadingArtPieces && (
              <CircularProgress size={90} thickness={7} />
            )}
          </div>
          {!this.state.isLoadingArtPieces && (
            <AdminList artpieces={this.state.artPieces} />
          )}
          <AddArtPieceDialog />
        </Paper>

        <Paper style={this.styles().paper}>
          <AppBar title="Types d'oeuvres" iconElementLeft={<IconButton />} />
          <div style={this.styles().centered}>
            {this.state.isLoadingArtTypes && (
              <CircularProgress size={90} thickness={7} />
            )}
          </div>
          {!this.state.isLoadingArtTypes && (
            <AdminList arttypes={this.state.artTypes} />
          )}
          <AddArtTypeDialog />
        </Paper>
      </div>
    );
  }
}

export default Admin;
