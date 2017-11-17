// @flow
import React, { Component } from "react";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import Divider from "material-ui/Divider";
import type {
  CartType,
  ArtPieceType,
  OrderType,
  firebaseUser
} from "../types/types";

import { CircularProgress } from "material-ui/Progress";
import {
  getCart,
  auth,
  addCartToFirebase,
  addOrderToFirebase
} from "../javascript/firebaseUtils";

import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";

class Cart extends Component {
  state: {
    checked: Array<number>,
    artpieces: Array<ArtPieceType>,
    user: ?firebaseUser,
    ordering: boolean,
    loadingCart: boolean
  } = {
    checked: [],
    artpieces: [],
    user: null,
    ordering: false,
    loadingCart: true
  };

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  componentWillMount() {
    (async () => {
      if (auth) {
        await auth.onAuthStateChanged(async user => {
          this.setState({ user: user });
          if (user) {
            const currentCart: ?CartType = await getCart(user.uid);
            if (currentCart && currentCart.active && currentCart.itemCount) {
              this.setState({
                artpieces: currentCart.items,
                loadingCart: false
              });
            } else {
              this.setState({
                loadingCart: false
              });
            }
          }
        });
      }
    })();
  }

  handleToggle = (value: number) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  styles() {
    return {
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      margin: {
        marginBottom: "1em"
      },
      marginButtons: {
        margin: "1em"
      },
      total: {
        fontSize: "2rem"
      }
    };
  }

  updateCart = async () => {
    if (this.state.user && this.state.artpieces) {
      const currentCart: ?CartType = await getCart(this.state.user.uid);
      const newCart: CartType = {
        ...currentCart,
        uid: this.state.user.uid,
        itemCount: this.state.artpieces.length,
        items: this.state.artpieces
      };
      addCartToFirebase("/cart/", newCart);
    } else {
      console.log("You must login");
    }
  };

  closeCart = async () => {
    if (this.state.user) {
      const currentCart: ?CartType = await getCart(this.state.user.uid);
      const newCart: CartType = {
        ...currentCart,
        active: false,
        uid: this.state.user.uid
      };
      addCartToFirebase(`/cart/`, newCart);
    } else {
      console.log("You must login");
    }
  };

  deleteCartItem = () => {
    this.state.checked.forEach((index: number) => {
      if (this.state.artpieces.length) this.state.artpieces.splice(index, 1);
      this.setState({
        checked: []
      });
      this.updateCart();
    });
  };

  computeTotal = () => {
    let total: number = 0;
    this.state.artpieces.forEach((e: ArtPieceType) => {
      total += Number(e.sellPriceTaxIncluded.replace(/\s/g, ""));
    });
    return total;
  };

  performOrder = async () => {
    if (this.state.user && this.state.artpieces.length) {
      this.setState({
        ordering: true
      });
      const order: OrderType = {
        userId: this.state.user.uid,
        artpieces: this.state.artpieces,
        userEmail: this.state.user.email,
        total: this.computeTotal(),
        status: false
      };
      await addOrderToFirebase("/orders", order);
      await this.closeCart();
      this.setState({
        ordering: false,
        artpieces: []
      });
      window.location.href = "/success";
    }
  };

  render = () => {
    return (
      <div>
        <Header />

        <div className="body">
          <h1 style={this.styles().centered}> Votre sélection </h1>
          <Divider style={this.styles().margin} />
          {this.state.loadingCart && <CircularProgress size={90} />}
          <List>
            {this.state.artpieces.length &&
              this.state.artpieces.map((value: ArtPieceType, index: number) => (
                <ListItem
                  key={index}
                  dense
                  divider
                  button
                  href={`/product/${value.id}`}
                >
                  <Avatar alt={value.name} src={value.imagesLinks[0]} />
                  <ListItemText primary={value.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(index)}
                      checked={this.state.checked.indexOf(index) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            <ListItem key={this.state.artpieces.length} dense divider button>
              <ListItemText
                style={this.styles().total}
                primary={`Total: ${this.computeTotal()}€`}
              />
            </ListItem>
          </List>
          <Button
            raised
            onClick={e => this.performOrder()}
            style={this.styles().marginButtons}
          >
            Acheter
          </Button>
          <Button raised onClick={e => this.deleteCartItem()}>
            Supprimer selection ({this.state.checked.length})
          </Button>
        </div>

        <Footer />
      </div>
    );
  };
}

export default Cart;
