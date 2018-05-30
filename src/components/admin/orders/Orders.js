// @flow

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import '../../../css/App.css';
import {
  getLastOrder,
  getUsersExtraInfos,
} from '../../../javascript/firebaseUtils';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import { OrdersList } from './OrdersList';
import type { FirebaseOrderType, UserType } from '../../../types/types';

type Props = {};
type State = {
  orders: FirebaseOrderType[],
  usersExtras: UserType[],
};

class Orders extends Component<Props, State> {
  state: State = {
    orders: [],
    usersExtras: [],
  };

  updateOrders = (order: FirebaseOrderType) => {
    this.setState({
      orders: [...this.state.orders, order],
    });
  };
  updateUserInfos = (userInfos: UserType[]) => {
    console.log(userInfos);
    this.setState({
      usersExtras: userInfos,
    });
    console.log(this.state.usersExtras);
  };
  componentDidMount() {
    // TODO: if user is not authenticated go to Login
    getLastOrder(this.updateOrders);
    getUsersExtraInfos(this.updateUserInfos);
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
              Commandes
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper elevation={3} style={this.styles().paper}>
          <Toolbar>
            <Typography variant="display3">Commandes</Typography>
          </Toolbar>

          <ConditionalCircularProgress
            predicate={this.state.orders.length === 0}
          />
          {this.state.orders.length &&
            this.state.usersExtras.length && (
              <OrdersList
                orders={this.state.orders}
                usersExtras={this.state.usersExtras}
              />
            )}
        </Paper>
        <br />
        <br />
      </div>
    );
  }
}

export default Orders;
