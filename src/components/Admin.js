// @flow

import React, { Component } from "react";

import "../css/App.css";

import Paper from "material-ui/Paper";
import { CircularProgress } from "material-ui/Progress";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import { Pagination } from "react-bootstrap";

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
    artistsActivePage: number,
    artpiecesActivePage: number,
    arttypesActivePage: number
  } = {
    artists: [],
    artPieces: [],
    artTypes: [],
    artistsActivePage: 1,
    artpiecesActivePage: 1,
    arttypesActivePage: 1
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
  handleSelectArtist = (eventKey: number) => {
    this.setState({
      artistsActivePage: eventKey
    });
  };

  handleSelectArtPieces = (eventKey: number) => {
    this.setState({
      artpiecesActivePage: eventKey
    });
  };

  handleSelectArtist = (eventKey: number) => {
    this.setState({
      arttypesActivePage: eventKey
    });
  };
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
            <AdminList
              artists={this.state.artists.slice(
                5 * (this.state.artistsActivePage - 1),
                5 * this.state.artistsActivePage
              )}
            />
          )}

          {/* <AddArtistDialog /> */}

          <Pagination
            style={this.styles().centered}
            prev
            next
            first
            last
            ellipsis
            maxButtons={5}
            bsSize="medium"
            boundaryLinks
            items={Math.ceil(this.state.artists.length / 5)}
            activePage={this.state.artistsActivePage}
            onSelect={this.handleSelectArtist}
          />
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
            <AdminList
              artpieces={this.state.artPieces.slice(
                5 * (this.state.artpiecesActivePage - 1),
                5 * this.state.artpiecesActivePage
              )}
            />
          )}
          <AddArtPieceDialog
            artists={this.state.artists}
            arttypes={this.state.artTypes}
          />
          <Pagination
            style={this.styles().centered}
            prev
            next
            first
            last
            ellipsis
            maxButtons={5}
            bsSize="medium"
            boundaryLinks
            items={Math.ceil(this.state.artPieces.length / 5)}
            activePage={this.state.artpiecesActivePage}
            onSelect={this.handleSelectArtPieces}
          />
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
            <AdminList
              arttypes={this.state.artTypes.slice(
                5 * (this.state.arttypesActivePage - 1),
                5 * this.state.arttypesActivePage
              )}
            />
          )}
          <AddArtTypeDialog />
        </Paper>
      </div>
    );
  }
}

export default Admin;
