// @flow

import React, { Component } from "react";

import { GridList, GridListTile, GridListTileBar } from "material-ui/GridList";
import { CircularProgress } from "material-ui/Progress";
import Divider from "material-ui/Divider";

import { Image } from "react-bootstrap";

import "../css/App.css";

import type { ArtistType, ArtPieceType } from "../types/types";
import { ArtistHomeGrid } from "./ArtistHomeGrid";
import { ArtPieceGrid } from "./ArtPieceGrid";

import Header from "./Header";
import Footer from "./Footer";

import { getArtists, getArtPieces } from "../javascript/firebaseUtils";

class Home extends Component {
  state: {
    artists: ?Array<ArtistType>,
    artpieces: ?Array<ArtPieceType>
  } = {
    artists: null,
    artpieces: null
  };

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  componentWillMount() {
    const callbackArtists = dataArtists => {
      this.setState({
        artists: dataArtists
      });
    };
    getArtists(callbackArtists);

    const callbackArtpieces = dataArtpieces => {
      this.setState({
        artpieces: dataArtpieces
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
        flexWrap: "wrap",
        justifyContent: "center",
        overflow: "hidden"
      },
      fullwidth: {
        width: "100%",
        height: "auto"
      },
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      button: {
        margin: 12
      },
      divider: {
        color: "#ff7e17",
        marginTop: "0.5em",
        marginBottom: "3em"
      },
      headers: {
        display: "flex",
        justifyContent: "space-between"
      },
      category: {
        marginBottom: "2em"
      },
      image: {
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "center"
      },
      relative: {
        position: "relative",
        width: "100%",
        height: "35em"
      },
      slides: {
        root: {
          marginTop: "2em"
        },
        image: {
          height: "30em",
          width: "100%",
          position: "absolute"
        },
        catchphrase: {
          display: "flex",
          position: "absolute",
          justifyContent: "center",
          width: "100%",
          marginTop: "12em",
          color: "#FFFFFF"
        }
      },
      titleBar: {
        background: "rgba(0,0,0,0.15)",
        height: "2.5em"
      }
    };
  }

  listArtists() {
    if (this.state.artists) {
      const featuredArtists = this.state.artists.filter(
        (e: ArtistType) => (e.featured ? e.featured : false)
      );
      return featuredArtists.map((artist, index) => {
        return ArtistHomeGrid(artist, index);
      });
    }
  }

  listArtPieces(startIndex: number, endIndex: number) {
    if (this.state.artpieces) {
      return this.state.artpieces
        .slice(startIndex, endIndex)
        .map((artpiece, index) => {
          return ArtPieceGrid(artpiece, index, "");
        });
    }
  }
  listFeaturedArtPieces() {
    if (this.state.artpieces) {
      const featuredArtPieces = this.state.artpieces.filter(
        (e: ArtPieceType) => (e.featured ? e.featured : false)
      );
      return featuredArtPieces.map((artpiece, index) => {
        return ArtPieceGrid(artpiece, index, "");
      });
    }
  }

  render() {
    return (
      <div className="Home">
        <Header />
        <div className style={this.styles().slides.root}>
          <div style={this.styles().relative}>
            <Image
              src={require("../assets/home.jpg")}
              style={this.styles().slides.image}
            />
            <div style={this.styles().slides.catchphrase}>
              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontSize: "3rem"
                }}
              >
                Bienvenue dans notre nouveau concept store, la Mega Dental Art
                Gallery.
              </h1>
            </div>
          </div>
        </div>
        <div className="body">
          <div style={this.styles().category}>
            <div style={this.styles().centered}>
              <h1>Nouveautés</h1>
            </div>
            <Divider style={this.styles().divider} />

            <div className="ProgressBar" style={this.styles().centered}>
              {!this.state.artpieces && <CircularProgress size={90} />}
            </div>
            {this.state.artpieces &&
              this.state.artpieces.length && (
                <GridList
                  cellHeight={250}
                  style={this.styles().gridList}
                  cols={4}
                >
                  {this.listFeaturedArtPieces()}
                  <GridListTile key={4}>
                    <GridListTileBar
                      title="Voir toutes les nouveautés..."
                      style={this.styles().titleBar}
                    />

                    <Image
                      src={require("../assets/more.jpg")}
                      alt="Voir plus d'oeuvres"
                      style={this.styles().image}
                      onClick={e => (window.location.href = "/nouveautes")}
                    />
                  </GridListTile>
                </GridList>
              )}
          </div>
          <div style={this.styles().category}>
            <div style={this.styles().centered}>
              <h1>Artistes du moment</h1>
            </div>
            <Divider style={this.styles().divider} />
            <div className="ProgressBar" style={this.styles().centered}>
              {!this.state.artists && <CircularProgress size={90} />}
            </div>
            {this.state.artists &&
              this.state.artists.length && (
                <GridList
                  cellHeight={300}
                  style={this.styles().gridList}
                  cols={4}
                >
                  {this.listArtists()}
                  <GridListTile key={4}>
                    <GridListTileBar
                      title="Voir plus d'artistes..."
                      style={this.styles().titleBar}
                    />

                    <Image
                      src={require("../assets/more.jpg")}
                      alt="Voir plus d'artistes"
                      style={this.styles().image}
                      onClick={e => (window.location.href = "/artistes")}
                    />
                  </GridListTile>
                </GridList>
              )}
          </div>
          <div style={this.styles().category}>
            <div style={this.styles().centered}>
              <h1>Notre Sélection</h1>
            </div>
            <Divider style={this.styles().divider} />
            <div className="ProgressBar" style={this.styles().centered}>
              {!this.state.artpieces && <CircularProgress size={90} />}
            </div>
            {this.state.artpieces &&
              this.state.artpieces.length && (
                <GridList
                  cellHeight={250}
                  style={this.styles().gridList}
                  cols={4}
                >
                  {this.listArtPieces(3, 7)}
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
