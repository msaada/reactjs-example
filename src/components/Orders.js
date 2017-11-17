// @flow

import React, { Component } from "react";

import "../css/App.css";

import { CircularProgress } from "material-ui/Progress";
import AppBar from "material-ui/AppBar";

import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import type { OrderType, UserType } from "../types/types";

import { getLastOrder, getUsersExtraInfos } from "../javascript/firebaseUtils";

import Paper from "material-ui/Paper";
import { OrdersList } from "./OrdersList";

class Orders extends Component {
  state: {
    orders: Array<OrderType>,
    usersExtras: Array<UserType>
  } = {
    orders: [],
    usersExtras: []
  };

  updateOrders = (order: OrderType) => {
    this.setState({
      orders: [...this.state.orders, order]
    });
  };
  updateUserInfos = (userInfos: Array<UserType>) => {
    console.log(userInfos);
    this.setState({
      usersExtras: userInfos
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
              Commandes
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <br />
        <br />
        <br />
        <Paper elevation={3} style={this.styles().paper}>
          <Toolbar>
            <Typography type="display3">Commandes</Typography>
          </Toolbar>

          <div style={this.styles().centered}>
            {!this.state.orders.length && <CircularProgress size={90} />}
          </div>
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
