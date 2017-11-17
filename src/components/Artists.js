// @flow
import React, { Component } from "react";

import type { ArtistType } from "../types/types";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import { GridList } from "material-ui/GridList";
import Divider from "material-ui/Divider";
import { ArtistGrid } from "./ArtistGrid";

import { CircularProgress } from "material-ui/Progress";
import { getArtists } from "../javascript/firebaseUtils";

class Artists extends Component {
  state: {
    artists?: Array<ArtistType>
  };

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  constructor(props: any) {
    super(props);
    this.state = {};
  }
  listArtists() {
    if (this.state.artists) {
      return this.state.artists.map((artist, index) => {
        return ArtistGrid(artist, index);
      });
    }
  }

  componentWillMount() {
    const callbackArtists = dataArtists => {
      this.setState({
        ...this.state,
        artists: dataArtists
      });
    };
    getArtists(callbackArtists);
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
      absolute: {
        position: "absolute"
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

        <div className="body">
          <h1 style={this.styles().centered}> Artistes </h1>
          <Divider style={this.styles().margin} />
          <div className="ProgressBar" style={this.styles().centered}>
            {!this.state.artists && <CircularProgress size={90} />}
          </div>
          {this.state.artists &&
            this.state.artists.length && (
              <GridList
                cellHeight={450}
                style={this.styles().gridList}
                cols={3}
              >
                {this.listArtists()}
              </GridList>
            )}
        </div>

        <Footer />
      </div>
    );
  };
}

export default Artists;
