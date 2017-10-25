// @flow

import React, { Component } from "react";
import Home from "./Home";
import Login from "./Login";
import Admin from "./Admin";
import Product from "./Product";

import "../css/App.css";

import { init as firebaseInit } from "../javascript/firebaseUtils";

import { Router, Route, browserHistory } from "react-router";

class App extends Component {
  constructor(props: any) {
    super(props);
    firebaseInit();
  }

  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={Home} />
          <Route path="/product/:productId" component={Product} />
          <Route path="*" component={NotFound} />
        </Router>
      </div>
    );
  }
}

const NotFound = () => <h1>404.. This page is not found!</h1>;

export default App;
