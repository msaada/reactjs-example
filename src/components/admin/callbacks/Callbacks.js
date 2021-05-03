import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import '../../../css/App.css';
import { getLastCallback } from '../../../javascript/firebaseUtils';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import CallbacksAdminList from './CallbacksAdminList';

export default class Callbacks extends Component {
  state = {
    callbacks: [],
  };

  updateCallbacks = (callback) => {
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
        padding: '3em',
        margin: '3em',
      },
    };
  }
  render() {
    return (
      <div style={this.styles().root}>
        <AppBar position="sticky">
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
          <CallbacksAdminList callbacks={this.state.callbacks} />
        </Paper>
      </div>
    );
  }
}
