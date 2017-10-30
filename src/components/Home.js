// @flow

import React, { Component } from "react";

import type {
  ArtistType,
  ArtPieceType,
  CategoryType,
  ArtTypeType
} from "../types/types";

import "../css/App.css";

import { ArtistGrid } from "./ArtistGrid";
import { ArtPieceGrid } from "./ArtPieceGrid";
import { CategoryTyle } from "./CategoryTyle";
import HomeSlider from "./HomeSlider";

import Header from "./Header";
import Footer from "./Footer";

import { categories } from "../datas/categories";
import { Image } from "react-bootstrap";

import { GridList } from "material-ui/GridList";
import CircularProgress from "material-ui/CircularProgress";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";

import { browserHistory } from "react-router";
import {
  getArtists,
  getArtPieces,
  getArtTypes
} from "../javascript/firebaseUtils";

class Home extends Component {
  state: {
    artists?: Array<ArtistType>,
    artpieces?: Array<ArtPieceType>,
    arttypes?: Array<ArtTypeType>,
    isLoading: boolean
  };
  constructor(props: { artists: ArtistType }) {
    super(props);
    this.state = {
      artists: [],
      artpieces: [],
      arttypes: [],
      isLoading: true
    };
  }
  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  componentWillMount() {
    const callbackArtists = dataArtists => {
      this.setState({
        ...this.state,
        artists: dataArtists.slice(0, 4)
      });
    };
    getArtists(callbackArtists);

    const callbackArtpieces = dataArtpieces => {
      this.setState({
        ...this.state,
        artpieces: dataArtpieces.slice(0, 4)
      });
    };
    getArtPieces(callbackArtpieces);
    const callbackArttype = dataArttypes => {
      this.setState({
        ...this.state,
        isLoading: false,
        arttypes: dataArttypes.slice(0, 4)
      });
    };
    getArtTypes(callbackArttype);
  }

  styles() {
    return {
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
      },
      gridList: {
        overflowY: "auto",
        display: "flex",
        justifyContent: "center"
      },
      fullwidth: {
        width: "100%"
      },
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      button: {
        margin: 12
      },
      slides: {
        height: "70%",
        width: "auto",
        padding: "1em",
        textAlign: "center"
      },
      paper: {
        padding: 20
      },
      divider: {
        color: "#ff7e17"
      },
      headers: {
        display: "flex",
        justifyContent: "space-between"
      }
    };
  }

  listArtists() {
    if (this.state.artists) {
      return this.state.artists.map((artist, index) => {
        return ArtistGrid(artist, index);
      });
    }
  }

  listCategories() {
    if (this.state.arttypes) {
      return this.state.arttypes.map((arttype, index) => {
        return CategoryTyle(index, arttype);
      });
    }
  }

  listArtPieces() {
    if (this.state.artpieces) {
      return this.state.artpieces.map((artpiece, index) => {
        return ArtPieceGrid(artpiece, index, "");
      });
    }
  }
  render() {
    return (
      <div className="Home">
        <Header />
        <br />
        <div style={this.styles().centered}>
          <Image
            src={require("../assets/home.jpg")}
            style={this.styles().slides}
          />
        </div>
        <div className="body">
          <br />
          <br />
          <div style={this.styles().headers}>
            <div className="canvasTitle">nouveautés</div>
            <FlatButton
              label="Voir toutes les nouveautés"
              onClick={e => browserHistory.push("/")}
            />
          </div>
          <Divider />
          <br />
          <div className="ProgressBar" style={this.styles().centered}>
            {this.state.isLoading && (
              <CircularProgress size={90} thickness={7} />
            )}
          </div>
          {!this.state.isLoading && (
            <GridList
              cellHeight={250}
              style={this.styles().gridList}
              cols={4}
              padding={10}
            >
              {this.listArtPieces()}
            </GridList>
          )}
          <br />
          <br />
          <div style={this.styles().headers}>
            <div className="canvasTitle">artistes du moment</div>
            <FlatButton
              label="Voir tous les artistes"
              onClick={e => browserHistory.push("/")}
            />
          </div>
          <Divider />
          <br />
          <div className="ProgressBar" style={this.styles().centered}>
            {this.state.isLoading && (
              <CircularProgress size={90} thickness={7} />
            )}
          </div>
          {!this.state.isLoading && (
            <GridList
              cellHeight={250}
              style={this.styles().gridList}
              cols={4}
              padding={10}
            >
              {this.listArtists()}
            </GridList>
          )}
          <br />
          <br />
          <div style={this.styles().headers}>
            <div className="canvasTitle">Catégories</div>
            <FlatButton
              label="Voir toutes les catégories"
              onClick={e => browserHistory.push("/")}
            />
          </div>
          <Divider />
          <br />
          <div className="ProgressBar" style={this.styles().centered}>
            {this.state.isLoading && (
              <CircularProgress size={90} thickness={7} />
            )}
          </div>
          {!this.state.isLoading && (
            <GridList
              cellHeight={250}
              style={this.styles().gridList}
              cols={4}
              padding={10}
            >
              {this.listCategories()}
            </GridList>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
