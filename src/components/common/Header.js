import PersonIcon from '@material-ui/icons/Person';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../assets/Art-Gallery-Logo.jpg';
import megadentalLogo from '../../assets/MEGA-DENTAL-logo.png';

import {
  auth,
  getCart,
  getUserExtraInfos,
  listenToCartChange,
  logOut,
} from '../../javascript/firebaseUtils';

class Header extends Component {
  state = {
    user: null,
    cart: null,
    userInfos: null,
  };

  componentDidMount = () => {
    (async () => {
      const callbackExtraInfos = (userInfos) => {
        this.setState({
          userInfos,
        });
      };
      if (auth) {
        await auth.onAuthStateChanged(async (user) => {
          this.setState({ user: user });
          if (user && user.uid) {
            getUserExtraInfos(user.uid, callbackExtraInfos);
            const currentCart = await getCart(user.uid);
            let cartId;
            if (currentCart && currentCart.active && currentCart.itemCount) {
              cartId = currentCart.id;
              this.setState({ cart: currentCart });
            }
            const callback = (cart) => {
              this.setState({ cart });
            };
            if (user) {
              listenToCartChange(user.uid, cartId, callback);
            }
          }
        });
      }
    })();
  };

  styles() {
    return {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1em',
        height: '5em',
        marginBottom: '2em',
      },
      connect_buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '3.5em',
      },
      mega: {
        height: '2rem',
        width: 'auto',
      },
      nav_buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '0.5em',
      },
      logo: {
        height: '50%',
        maxWidth: '15em',

        marginBottom: '1em',
        float: 'left',
      },
      padding: {
        height: '3em',
      },
      nav_div: {
        flexGrow: '1',
      },
      hover_color: {
        color: '#ff7e17',
      },
      divider: {
        marginBottom: '2em',
      },
      button: {
        fontFamily: 'Din',
      },
    };
  }
  render() {
    return (
      <div style={{ marginBottom: '3em' }}>
        <div style={this.styles().divider}>
          <div style={this.styles().connect_buttons}>
            {this.state.user && (
              <Button
                id="cart-button"
                style={this.styles().button}
                href="/panier"
              >
                {this.state.userInfos && this.state.userInfos.name}
                <Badge
                  badgeContent={this.state.cart ? this.state.cart.itemCount : 0}
                  color="primary"
                >
                  <ShoppingBasketIcon style={{ marginLeft: '0.5em' }} />
                </Badge>
              </Button>
            )}
            {!this.state.user && (
              <Button style={this.styles().button} href="/connexion">
                Connexion / Inscription
                <PersonIcon style={{ marginLeft: '1em' }} />
              </Button>
            )}
            {this.state.user && (
              <Button style={this.styles().button} onClick={logOut}>
                Déconnexion
              </Button>
            )}
            <Button
              style={this.styles().button}
              href="http://www.megadental.fr"
            >
              Retour vers
              <Image
                src={megadentalLogo}
                alt={'Megadental logo'}
                style={this.styles().mega}
                onClick={(e) =>
                  (window.location.href = 'http://www.megadental.fr')
                }
              />
            </Button>
          </div>
          <Divider style={{ backgroundColor: 'black', marginBottom: '3em' }} />
        </div>
        <div style={this.styles().root}>
          <a href={'/'}>
            <Image
              src={logo}
              style={this.styles().logo}
              alt="Mega Dental concept store Art Gallery"
            />
          </a>
          {/* <Button style={this.styles().logo}>
            <Image
              src={logo}
              style={this.styles().logo}
              alt="Mega Dental concept store Art Gallery"
            />
          </Button> */}
          <div>
            <div style={this.styles().padding} />
            <Divider />
            <div style={this.styles().nav_buttons}>
              <Button style={this.styles().button} href="/">
                Accueil
              </Button>
              <Button style={this.styles().button} href="/categories">
                Catégories
              </Button>
              <Button style={this.styles().button} href="/artistes">
                Artistes
              </Button>
              <Button
                style={this.styles().button}
                href="https://fr.calameo.com/read/0049570701acccdc80e6a"
              >
                Catalogue
              </Button>
              <Button style={this.styles().button} href="/bailart">
                Financement
              </Button>
              <Button style={this.styles().button} href="/demander-rappel">
                Rappelez-moi
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
