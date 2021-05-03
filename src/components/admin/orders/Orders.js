import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import '../../../css/App.css';
import {
  getLastOrder,
  getUsersExtraInfos,
} from '../../../javascript/firebaseUtils';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import { OrdersList } from './OrdersList';

class Orders extends Component {
  state = {
    orders: [],
    usersExtras: [],
  };

  updateOrders = (order) => {
    this.setState({
      orders: [...this.state.orders, order],
    });
  };
  updateUserInfos = (userInfos) => {
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
          <OrdersList
            orders={this.state.orders}
            usersExtras={this.state.usersExtras}
          />
        </Paper>
      </div>
    );
  }
}

export default Orders;
