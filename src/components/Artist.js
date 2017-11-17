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
    artistId: string,
    artist?: ArtistType,
    artpieces?: Array<ArtPieceType>,
    partnerships: Array<string>
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
      artistId: "",
      partnerships: [
        "-KxQN_PUOfW6imQjEiBl",
        "-KxhHgzfrlX70IJcq9Qh",
        "-Ky5SoZDuolo93hW4Fgw",
        "-Ky5T5_vdSQwr5wFNRaC",
        "-Ky60Vad9eF8HJgjG-28",
        "-Ky86FbGksPkuATZTUKs",
        "-Ky881l2VpZmCtu2JF-a",
        "-Ky89SFc3QMElYX7nGTH",
        "-Ky89k8bJvm3jFTbgMF2",
        "-Ky8A_XCatQzONZNBNdE",
        "-KyGQShpzdPduBntUuwO",
        "-KyGQWIv_v_e8NL2JJ4V",
        "-KyGQutip_YSdhdiGejc",
        "-KyGQpIiepX7oBN6xWgm",
        "-KyGQsOD8hlRbf5D09Cb"
      ]
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
      descriptionArea: {
        display: "flex",
        justifyContent: "center",
        textAlign: "justify",
        fontSize: "1.5em"
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
      },
      partnership: {
        display: "flex",
        justifyContent: "center",
        fontStyle: "italic"
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

  checkPartnership = () => {
    return this.state.partnerships.indexOf(this.state.artistId) !== -1;
  };

  conditionalPartnership = () => {
    if (this.checkPartnership()) {
      return <div>En partenariat avec la galerie Palmer – Paris 6ème</div>;
    }
  };
  conditionalDescription = () => {
    if (this.state.artist && this.state.artist.description.length) {
      return (
        <div>
          <div className="canvasTitle">Biographie</div>
          <Divider style={this.styles().divider} />
          <p style={this.styles().descriptionArea}>
            {this.state.artist && this.state.artist.description}
          </p>
        </div>
      );
    }
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
          <div style={this.styles().partnership}>
            {this.conditionalPartnership()}
          </div>
          <br />
          {this.conditionalDescription()}
          <br />
          <div className="canvasTitle">Oeuvres</div>
          <Divider style={this.styles().divider} />

          {!this.state.isLoading && (
            <GridList cellHeight={250} style={this.styles().gridList} cols={4}>
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
