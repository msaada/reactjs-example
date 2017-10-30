// @flow

import React, { Component } from "react";
import Home from "./Home";
import Login from "./Login";
import Admin from "./Admin";
import Product from "./Product";
import Artist from "./Artist";

import "../css/App.css";

import {
  Paintings,
  Sculpture,
  Engraving,
  Furniture,
  Photography
} from "./PagesWrapper";

import { init as firebaseInit } from "../javascript/firebaseUtils";

import { Router, Route, browserHistory } from "react-router";
import { categories } from "../datas/categories";

class App extends Component {
  constructor(props: any) {
    super(props);
    firebaseInit();
  }

  addBaseUrl = (root: string, url: string) => {
    return root + url;
  };

  render() {
    const root: string = "www.adoptrs.com/mega-art";
    // const root: string = "";
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Route path={this.addBaseUrl(root, "/")} component={Home} />
          <Route path={this.addBaseUrl(root, "/admin")} component={Admin} />
          <Route path={this.addBaseUrl(root, "/login")} component={Login} />
          <Route path={this.addBaseUrl(root, "/sign-up")} component={Home} />
          <Route
            path={this.addBaseUrl(root, "/product/:productId")}
            component={Product}
          />
          <Route
            path={this.addBaseUrl(root, "/artist/:artistId")}
            component={Artist}
          />
          <Route
            path={this.addBaseUrl(root, categories.gravure.url)}
            component={Engraving}
          />
          <Route
            path={this.addBaseUrl(root, categories.sculpture.url)}
            component={Sculpture}
          />
          <Route
            path={this.addBaseUrl(root, categories.peinture.url)}
            component={Paintings}
          />
          <Route
            path={this.addBaseUrl(root, categories.meuble.url)}
            component={Furniture}
          />
          <Route
            path={this.addBaseUrl(root, categories.photographie.url)}
            component={Photography}
          />
          <Route path="*" component={NotFound} />
        </Router>
      </div>
    );
  }
}

const NotFound = () => <h1>404.. This page is not found!</h1>;

export default App;
