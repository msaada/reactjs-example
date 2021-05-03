import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import AlertDialogNoUser from './AlertDialogNoUser';
import AlertDialogReserved from './AlertDialogReserved';
import AlertDialogSlide from './AlertDialogAddedToCart';
import { addCartToFirebase, getCart } from '../../javascript/firebaseUtils';

export default class BuyProduct extends Component {
  state = {
    addedToCart: false,
    noUserDialog: false,
    reservedDialog: false,
  };

  openAddToCartDialog = () => {
    this.setState({
      addedToCart: true,
    });
  };
  closeAddToCartDialog = () => {
    this.setState({
      addedToCart: false,
    });
  };

  openNoUserDialog = () => {
    this.setState({
      noUserDialog: true,
    });
  };
  closeNoUserDialog = () => {
    this.setState({
      noUserDialog: false,
    });
  };

  openReservedDialog = () => {
    this.setState({
      reservedDialog: true,
    });
  };
  closeReservedDialog = () => {
    this.setState({
      reservedDialog: false,
    });
  };
  styles() {
    return {
      buyArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      button: {
        fontFamily: 'Din',
      },
    };
  }
  addToCart = (product) => (user) => async () => {
    if (product.reserved) {
      this.setState({
        reservedDialog: true,
      });
    } else if (!user) {
      this.setState({
        noUserDialog: true,
      });
    } else {
      const currentCart = await getCart(user.uid);
      let newCart;
      if (currentCart && currentCart.active && currentCart.itemCount) {
        newCart = {
          ...currentCart,
          id: user.uid,
          itemCount: currentCart.itemCount + 1,
          items: [...currentCart.items, product],
        };
      } else {
        newCart = {
          id: user.uid,
          itemCount: 1,
          items: [product],
          active: true,
        };
      }
      addCartToFirebase(newCart);
      this.setState({
        addedToCart: true,
      });
    }
  };

  render() {
    const { product, user } = this.props;
    const { addedToCart, noUserDialog, reservedDialog } = this.state;
    if (product) {
      return (
        <div style={this.styles().buyArea}>
          <h2 style={this.styles().centered}>
            {product.sellPriceTaxIncluded}€
          </h2>

          <Button
            onClick={this.addToCart(product)(user)}
            style={this.styles().button}
          >
            Ajouter au panier
          </Button>
          <AlertDialogSlide
            open={addedToCart}
            handleRequestOpen={this.openAddToCartDialog}
            handleRequestClose={this.closeAddToCartDialog}
          />
          <AlertDialogNoUser
            open={noUserDialog}
            handleRequestOpen={this.openNoUserDialog}
            handleRequestClose={this.closeNoUserDialog}
          />
          <AlertDialogReserved
            open={reservedDialog}
            handleRequestOpen={this.openReservedDialog}
            handleRequestClose={this.closeReservedDialog}
          />
        </div>
      );
    }
    return null;
  }
}
