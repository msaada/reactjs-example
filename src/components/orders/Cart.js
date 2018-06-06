// @flow
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import React, { Component } from 'react';
import '../../css/App.css';
import {
  addCartToFirebase,
  addOrderToFirebase,
  auth,
  getCart,
} from '../../javascript/firebaseUtils';
import ConditionalCircularProgress from '../common/ConditionalCircularProgress';
import Footer from '../common/Footer';
import Header from '../common/Header';

import type {
  CartType,
  ArtPieceType,
  OrderType,
  FirebaseUser,
} from '../../types/types';

type Props = {};

type State = {
  checked: number[],
  artpieces: ArtPieceType[],
  user: ?FirebaseUser,
  ordering: boolean,
  loadingCart: boolean,
};

class Cart extends Component<Props, State> {
  state = {
    checked: [],
    artpieces: [],
    user: null,
    ordering: false,
    loadingCart: true,
  };

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
                loadingCart: false,
              });
            } else {
              this.setState({
                loadingCart: false,
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
      checked: newChecked,
    });
  };

  styles() {
    return {
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      margin: {
        marginBottom: '1em',
      },
      marginButtons: {
        margin: '1em',
      },
      total: {
        fontSize: '2rem',
      },
    };
  }

  updateCart = async () => {
    if (this.state.user && this.state.artpieces) {
      // Avoid flow screaming
      const user: FirebaseUser = this.state.user;
      const currentCart: ?CartType = await getCart(this.state.user.uid);
      const newCart: CartType = {
        ...currentCart,
        id: user.uid,
        itemCount: this.state.artpieces.length,
        items: this.state.artpieces,
      };
      addCartToFirebase(newCart);
    } else {
      console.log('You must login');
    }
  };

  closeCart = async () => {
    if (this.state.user) {
      // Avoid flow screaming
      const user: FirebaseUser = this.state.user;
      const currentCart: ?CartType = await getCart(this.state.user.uid);
      const newCart: CartType = {
        ...currentCart,
        active: false,
        id: user.uid,
      };
      addCartToFirebase(newCart);
    } else {
      console.log('You must login');
    }
  };

  deleteCartItem = () => {
    this.state.checked.forEach((index: number) => {
      if (this.state.artpieces.length) this.state.artpieces.splice(index, 1);
      this.setState({
        checked: [],
      });
      this.updateCart();
    });
  };

  computeTotal = () => {
    return this.state.artpieces.reduce(
      (total: number, artPiece: ArtPieceType) =>
        (total += artPiece.sellPriceTaxIncluded),
      0
    );
  };

  performOrder = async () => {
    if (this.state.user && this.state.artpieces.length) {
      // Avoid flow screaming
      const user: FirebaseUser = this.state.user;
      this.setState({
        ordering: true,
      });
      const order: OrderType = {
        userId: user.uid,
        artpieces: this.state.artpieces,
        userEmail: user.email,
        total: this.computeTotal(),
        status: false,
      };
      await addOrderToFirebase(order);
      await this.closeCart();
      this.setState({
        ordering: false,
        artpieces: [],
      });
      window.location.href = '/success';
    }
  };

  render = () => {
    return (
      <div>
        <Header />

        <div className="body">
          <h1 style={this.styles().centered}> Votre sélection </h1>
          <Divider style={this.styles().margin} />
          <ConditionalCircularProgress predicate={this.state.loadingCart} />

          <List>
            {this.state.artpieces.map((value: ArtPieceType, index: number) => (
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
