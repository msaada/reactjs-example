// @flow
import React, { Component } from "react";

import type { ArtistType, ArtPieceType } from "../types/types";

import { ArtPieceGrid } from "./ArtPieceGrid";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import { getArtist2, getArtPieceFromArtist } from "../javascript/firebaseUtils";

import { Image } from "react-bootstrap";
import { GridList } from "material-ui/GridList";
import Divider from "material-ui/Divider";

class Artist extends Component {
  state: {
    isLoading: boolean,
    lightboxIsOpen: boolean,
    productId: string,
    artist: ArtistType,
    artpieces: Array<ArtPieceType>
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
    await this.setStateAsync({
      ...this.state,
      artistId: this.props.params.artistId
    });

    const dataArtist: ArtistType = await getArtist2(this.props.params.artistId);
    console.log(dataArtist);
    await this.setStateAsync({
      artist: dataArtist
    });
    const dataArtpieces: Array<ArtPieceType> = await getArtPieceFromArtist(
      this.props.params.artistId
    );
    console.log(dataArtpieces);
    await this.setStateAsync({
      artpieces: dataArtpieces,
      isLoading: false
    });
  }

  listArtPieces() {
    if (this.state.artpieces && this.state.artist) {
      return this.state.artpieces.map((artpiece, index) => {
        return ArtPieceGrid(artpiece, index, this.state.artist.name);
      });
    }
  }

  styles() {
    return {
      root: {
        display: "flex",
        justifyContent: "space-between"
      },
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      divider: {
        marginBottom: "1em"
      },
      artistPhotoArea: {
        display: "flex",
        justifyContent: "center",
        height: "40em"
      },
      image: {
        height: "100%",
        width: "auto"
      },
      gridList: {
        overflowY: "auto",
        display: "flex",
        justifyContent: "center"
      }
    };
  }

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false
    });
  };

  openLightbox = () => {
    this.setState({
      lightboxIsOpen: true
    });
  };
  render = () => {
    return (
      <div>
        <Header />
        <div className="body">
          <div style={this.styles().artistPhotoArea}>
            {this.state.artist && (
              <Image
                src={this.state.artist.picture}
                style={this.styles().image}
              />
            )}
          </div>
          <div style={this.styles().centered}>
            <h1> {this.state.artist && this.state.artist.name}</h1>
          </div>
          <Divider style={this.styles().divider} />
          <h1> Ses oeuvres </h1>
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
        </div>
        <Footer />
      </div>
    );
  };
}

export default Artist;
