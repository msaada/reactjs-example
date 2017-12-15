// @flow
import React, { Component } from "react";

import type { ArtTypeType } from "../types/types";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import { GridList } from "material-ui/GridList";
import Divider from "material-ui/Divider";

import { CategoryTyle } from "./CategoryTyle";
import { CircularProgress } from "material-ui/Progress";
import { getArtTypes } from "../javascript/firebaseUtils";

class Categories extends Component {
  state: {
    arttypes: Array<ArtTypeType>
  } = {
    arttypes: []
  };

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  componentWillMount() {
    const callbackArttype = dataArttypes => {
      this.setState({
        arttypes: dataArttypes
      });
    };
    getArtTypes(callbackArttype);
  }

  listCategories() {
    if (this.state.arttypes) {
      return this.state.arttypes.map((arttype, index) => {
        return CategoryTyle(index, arttype);
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
          <h1 style={this.styles().centered}> Catégories </h1>
          <Divider style={this.styles().margin} />
          <div className="ProgressBar" style={this.styles().centered}>
            {!this.state.arttypes.length && <CircularProgress size={90} />}
          </div>
          {this.state.arttypes.length && (
            <GridList cellHeight={300} style={this.styles().gridList} cols={3}>
              {this.listCategories()}
            </GridList>
          )}
        </div>

        <Footer />
      </div>
    );
  };
}

export default Categories;
