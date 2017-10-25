// @flow

import React, { Component } from "react";

import type { ArtistType, CategoryType } from "../types/types";

import "../css/App.css";

import { Artist } from "./Artist";
import { Category } from "./Category";
import HomeSlider from "./HomeSlider";
import ArtistSlider from "./ArtistSlider";
import Header from "./Header";
import Footer from "./Footer";

import { categories } from "../datas/categories";

import { GridList } from "material-ui/GridList";
import CircularProgress from "material-ui/CircularProgress";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";

import { getArtists } from "../javascript/firebaseUtils";

class Home extends Component {
  state: {
    artists: Array<ArtistType>,
    isLoading: boolean
  };
  constructor(props: { artists: ArtistType }) {
    super(props);
    this.state = {
      artists: [],
      isLoading: true
    };
  }

  componentWillMount() {
    const callback = dataArtists => {
      this.setState({
        ...this.state,
        isLoading: false,
        artists: dataArtists
      });
    };
    getArtists(callback);
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
        height: "auto",
        width: "100%",
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
        justifyContent: "start",
        alignItems: "flex-end"
      }
    };
  }

  listArtists() {
    if (this.state.artists) {
      return this.state.artists.map((artist, index) => {
        return Artist(artist, index);
      });
    }
  }

  listCategories() {
    return categories.map((category: CategoryType, index: number) => {
      return Category(index, category);
    });
  }

  render() {
    return (
      <div className="Home">
        <Header />
        <br />
        <HomeSlider />
        <Divider />
        <div style={this.styles().headers}>
          <div className="canvasTitle">Les artistes du moment</div>

          <FlatButton label="Voir tous les artistes" />
        </div>
        <div className="ProgressBar" style={this.styles().centered}>
          {this.state.isLoading && <CircularProgress size={90} thickness={7} />}
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
        <ArtistSlider />
        <Divider />
        <div className="canvasTitle" style={this.styles().centered}>
          Nos catégories
        </div>
        <GridList
          cellHeight={250}
          style={this.styles().gridList}
          cols={3}
          padding={10}
        >
          {this.listCategories()}
        </GridList>
        <Divider />
        <h1 style={this.styles().centered}>Notre sélection</h1>
        <GridList
          cellHeight={250}
          style={this.styles().gridList}
          cols={3}
          padding={10}
        >
          {this.listCategories()}
        </GridList>

        <Footer />
      </div>
    );
  }
}

export default Home;
