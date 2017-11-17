// @flow

import React, { Component } from "react";

import "../css/App.css";

import { CircularProgress } from "material-ui/Progress";
import AppBar from "material-ui/AppBar";

import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import type { CallbackType } from "../types/types";

import { getLastCallback } from "../javascript/firebaseUtils";

import Paper from "material-ui/Paper";
import { CallbacksList } from "./CallbacksList";

class CallbackAdmin extends Component {
  state: {
    callbacks: Array<CallbackType>
  } = {
    callbacks: []
  };

  updateCallbacks = (callback: CallbackType) => {
    this.setState({
      callbacks: [...this.state.callbacks, callback]
    });
  };

  componentDidMount() {
    // TODO: if user is not authenticated go to Login
    getLastCallback(this.updateCallbacks);
  }
  styles() {
    return {
      root: {
        display: "flex",
        flexDirection: "column"
      },
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      paper: {
        padding: 20
      }
    };
  }
  render() {
    return (
      <div style={this.styles().root}>
        <AppBar>
          <Toolbar>
            <Typography type="display2" color="inherit">
              Demandes de rappel
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <br />
        <br />
        <br />
        <Paper elevation={3} style={this.styles().paper}>
          <Toolbar>
            <Typography type="display3">Rappels</Typography>
          </Toolbar>

          <div style={this.styles().centered}>
            {!this.state.callbacks.length && <CircularProgress size={90} />}
          </div>
          {this.state.callbacks.length && (
            <CallbacksList callbacks={this.state.callbacks} />
          )}
        </Paper>
        <br />
        <br />
      </div>
    );
  }
}

export default CallbackAdmin;
