// @flow
import React, { Component } from "react";

import type { ArtistType, ArtPieceType } from "../types/types";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import { Image } from "react-bootstrap";
import { GridList } from "material-ui/GridList";
import Divider from "material-ui/Divider";
import { ArtPieceGrid } from "./ArtPieceGrid";
import CircularProgress from "material-ui/CircularProgress";

import { getArtPieceFromArtType } from "../javascript/firebaseUtils";

class Category extends Component {
  state: {
    isLoading: boolean,
    lightboxIsOpen: boolean,
    productId?: string,
    artist?: ArtistType,
    artpieces?: Array<ArtPieceType>
  };

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      lightboxIsOpen: false,
      artistId: ""
    };
  }

  async componentWillMount() {
    const artPieces: Array<ArtPieceType> = await getArtPieceFromArtType(
      this.props.category.id
    );
    console.log(artPieces);
    await this.setStateAsync({
      artpieces: artPieces,
      isLoading: false
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
        height: "auto"
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
      absolute: {
        position: "absolute"
      },
      image: {
        height: "auto",
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
      }
    };
  }

  render = () => {
    return (
      <div>
        <Header />
        <div className style={this.styles().root}>
          <div style={this.styles().relative}>
            <Image
              src={this.props.category.image}
              style={this.styles().image}
            />
            <div style={this.styles().categoryName}>
              <div className="canvasTitle"> {this.props.category.url} </div>
            </div>
          </div>
          <div className="body">
            {this.state.artpieces &&
              this.state.artpieces.length &&
              !this.state.isLoading && <h1> Les oeuvres correspondantes </h1>}
            {this.state.artpieces &&
              !this.state.artpieces.length &&
              !this.state.isLoading && <h1> Aucune oeuvre pour le moment </h1>}

            <Divider style={this.styles().margin} />
            <div className="ProgressBar" style={this.styles().centered}>
              {this.state.isLoading && (
                <CircularProgress size={90} thickness={7} />
              )}
            </div>
            {!this.state.isLoading && (
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
