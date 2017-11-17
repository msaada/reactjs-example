// @flow
import React, { Component } from "react";

import "../css/App.css";

import { Image } from "react-bootstrap";

import { GridList } from "material-ui/GridList";
import Divider from "material-ui/Divider";
import { CircularProgress } from "material-ui/Progress";

import Header from "./Header";
import Footer from "./Footer";
import { ArtPieceGrid } from "./ArtPieceGrid";
import {
  getArtPieceFromArtType,
  getArtTypes
} from "../javascript/firebaseUtils";

import banner from "../assets/vue-galerie.jpg";

import type { ArtPieceType, ArtTypeType } from "../types/types";

class Category extends Component {
  state: {
    artpieces: Array<ArtPieceType>,
    arttypes: Array<ArtTypeType>
  } = {
    artpieces: [],
    arttypes: []
  };

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async componentWillMount() {
    let artPieces: Array<ArtPieceType>;
    const callbackTypes = (arttypes: Array<ArtTypeType>) => {
      this.setState({
        arttypes: arttypes.filter(
          (arttype: ArtTypeType) => arttype.id === this.props.category.id
        )
      });
    };
    if (this.props.category) {
      artPieces = await getArtPieceFromArtType(this.props.category.id);
      getArtTypes(callbackTypes);
    }
    await this.setStateAsync({
      artpieces: artPieces
    });
  }

  listArtPieces() {
    if (this.state.artpieces) {
      return this.state.artpieces.map((artpiece, index) => {
        return ArtPieceGrid(artpiece, index, "");
      });
    }
  }

  styles() {
    return {
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      },
      categoryName: {
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        width: "100%",
        marginTop: "12em"
      },
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      relative: {
        position: "relative",
        width: "100%",
        height: "35em"
      },
      image: {
        height: "30em",
        width: "100%",
        position: "absolute"
      },
      gridList: {
        overflowY: "auto",
        display: "flex",
        justifyContent: "center"
      },
      margin: {
        marginBottom: "1em"
      },
      name: {
        fontSize: "5em",
        textTransform: "uppercase"
      }
    };
  }

  render = () => {
    return (
      <div>
        <Header />
        <div className style={this.styles().root}>
          <div style={this.styles().relative}>
            <Image src={banner} style={this.styles().image} />
            <div style={this.styles().categoryName}>
              <div className="canvasTitle" style={this.styles().name}>
                {this.state.arttypes.length && this.state.arttypes[0].name}
              </div>
            </div>
          </div>
          <div className="body">
            {this.state.artpieces.length && (
              <h1> Les oeuvres correspondantes </h1>
            )}
            {!this.state.artpieces.length && (
              <h1> Aucune oeuvre pour le moment </h1>
            )}

            <Divider style={this.styles().margin} />
            <div className="ProgressBar" style={this.styles().centered}>
              {!this.state.artpieces.length && <CircularProgress size={90} />}
            </div>
            {this.state.artpieces.length && (
              <GridList
                cellHeight={300}
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
  };
}

export default Category;
