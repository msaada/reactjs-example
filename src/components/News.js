// @flow

import React, { Component } from "react";

import type { ArtPieceType } from "../types/types";

import "../css/App.css";

import { ArtPieceGrid } from "./ArtPieceGrid";

import Header from "./Header";
import Footer from "./Footer";

import { Image } from "react-bootstrap";

import { GridList } from "material-ui/GridList";
import { CircularProgress } from "material-ui/Progress";
import Divider from "material-ui/Divider";

import { getArtPieces } from "../javascript/firebaseUtils";
import mainImage from "../assets/vue-galerie.jpg";

class Home extends Component {
  state: {
    artpieces?: Array<ArtPieceType>,
    isLoading: boolean
  };
  constructor(props: any) {
    super(props);
    this.state = {
      artpieces: [],
      isLoading: true
    };
  }
  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  componentWillMount() {
    const callbackArtpieces = dataArtpieces => {
      this.setState({
        ...this.state,
        artpieces: dataArtpieces.slice(0, Math.min(12, dataArtpieces.length)),
        isLoading: false
      });
    };
    getArtPieces(callbackArtpieces);
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
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      divider: {
        marginTop: "0.5em",
        marginBottom: "3em"
      },
      category: {
        marginBottom: "2em"
      },
      image: {
        height: "30em",
        width: "100%",
        position: "absolute"
      },
      relative: {
        position: "relative",
        width: "100%",
        height: "35em"
      },
      absolute: {
        position: "absolute"
      },
      name: {
        fontSize: "5em",
        textTransform: "uppercase"
      },
      categoryName: {
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        width: "100%",
        marginTop: "12em"
      }
    };
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
      <div className="News">
        <Header />
        <div className style={this.styles().root}>
          <div style={this.styles().relative}>
            <Image src={mainImage} style={this.styles().image} />
            <div style={this.styles().categoryName}>
              <div className="canvasTitle" style={this.styles().name}>
                Nouveautés
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div style={this.styles().category}>
            <h1>Les oeuvres correspondantes</h1>
            <Divider style={this.styles().divider} />
            <div className="ProgressBar" style={this.styles().centered}>
              {this.state.isLoading && <CircularProgress size={90} />}
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
