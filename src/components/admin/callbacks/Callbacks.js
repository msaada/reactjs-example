// @flow

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import '../../../css/App.css';
import { getLastCallback } from '../../../javascript/firebaseUtils';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import CallbacksAdminList from './CallbacksAdminList';
import type { FirebaseCallbackType } from '../../../types/types';

type Props = {};
type State = {
  callbacks: FirebaseCallbackType[],
};

export default class Callbacks extends Component<Props, State> {
  state = {
    callbacks: [],
  };

  updateCallbacks = (callback: FirebaseCallbackType) => {
    this.setState({
      callbacks: [...this.state.callbacks, callback],
    });
  };

  componentDidMount() {
    // TODO: if user is not authenticated go to Login
    getLastCallback(this.updateCallbacks);
  }
  styles() {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
      },
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      paper: {
        padding: 20,
      },
    };
  }
  render() {
    return (
      <div style={this.styles().root}>
        <AppBar>
          <Toolbar>
            <Typography variant="display2" color="inherit">
              Demandes de rappel
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper elevation={3} style={this.styles().paper}>
          <Toolbar>
            <Typography variant="display3">Rappels</Typography>
          </Toolbar>

          <ConditionalCircularProgress
            predicate={this.state.callbacks.length === 0}
          />
          {this.state.callbacks.length && (
            <CallbacksAdminList callbacks={this.state.callbacks} />
          )}
        </Paper>
        <br />
        <br />
      </div>
    );
  }
}
