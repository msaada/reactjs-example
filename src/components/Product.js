// @flow
import React, { Component } from "react";

import { Image, ListGroup, ListGroupItem, Panel } from "react-bootstrap";

import type {
  ArtPieceType,
  ArtistType,
  CartType,
  firebaseUser
} from "../types/types";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";
import { GridListTile, GridList } from "material-ui/GridList";

import { CircularProgress } from "material-ui/Progress";
import Divider from "material-ui/Divider";
import Button from "material-ui/Button";

import { ArtPieceGrid } from "./ArtPieceGrid";

import {
  getArtPiece2,
  getArtist2,
  getArtPieceFromArtist,
  addCartToFirebase,
  auth,
  getCart
} from "../javascript/firebaseUtils";

import AlertDialogNoUser from "./AlertDialogNoUser";

import AlertDialogSlide from "./AlertDialogSlide";

import Lightbox from "react-images";

class Product extends Component {
  state: {
    isLoading: boolean,
    lightboxIsOpen: boolean,
    productId: string,
    product: ?ArtPieceType,
    artist: ?ArtistType,
    images: Array<string>,
    artpieces: Array<ArtPieceType>,
    currentImage: number,
    user: ?firebaseUser,
    addedToCart: boolean,
    noUserDialog: boolean
  } = {
    isLoading: true,
    lightboxIsOpen: false,
    productId: "",
    product: null,
    artist: null,
    images: [],
    artpieces: [],
    currentImage: 0,
    user: null,
    addedToCart: false,
    noUserDialog: false
  };

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  componentWillReceiveProps(nextProps: any) {
    (async () => {
      // TODO: force update when product change
      if (nextProps.params.productId !== this.props.params.productId) {
        console.log("update");
        this.setState({
          product: null
        });
        await this.getInfosFromFirebase();
      }
    })();
  }

  getInfosFromFirebase = async () => {
    if (auth) {
      await auth.onAuthStateChanged(user => {
        this.setState({ user: user });
      });
    }

    await this.setStateAsync({
      ...this.state,
      productId: this.props.params.productId
    });

    let dataProduct: ?ArtPieceType;
    if (!this.state.product) {
      if (this.props.params) {
        dataProduct = await getArtPiece2(this.props.params.productId);
        await this.setStateAsync({
          product: dataProduct
        });
      }
    }

    let dataArtist: ?ArtistType;
    if (!this.state.artist) {
      if (dataProduct) {
        dataArtist = await getArtist2(dataProduct.artistId);
        await this.setStateAsync({
          artist: dataArtist
        });
      }
    }
    let images: Array<string>;
    if (dataProduct) {
      images = this.lightboxImages(dataProduct.imagesLinks);
      this.setState({
        images: images
      });
    }

    let dataArtpieces: Array<ArtPieceType> = [];
    if (this.state.artist && !this.state.artpieces.length) {
      dataArtpieces = await getArtPieceFromArtist(this.state.artist.id);
      await this.setStateAsync({
        artpieces: dataArtpieces,
        isLoading: false
      });
    }
    await this.setStateAsync({
      isLoading: false
    });
  };

  componentWillMount() {
    (async () => {
      await this.getInfosFromFirebase();
    })();
  }

  styles() {
    return {
      root: {
        display: "flex",
        justifyContent: "space-between"
      },
      image: {
        display: "flex",
        justifyContent: "center",
        width: "40%",
        height: "40%"
      },
      divider: {
        marginBottom: "1em"
      },
      buyArea: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
      },
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      paper: {
        display: "flex",
        justifyContent: "center",
        height: "20em",
        textAlign: "center",
        width: "100%"
      },
      gridList: {
        overflowY: "auto",
        display: "flex",
        justifyContent: "center"
      },
      button: {
        fontFamily: "Din"
      },
      artistArea: {
        root: {
          display: "inline-flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        logoLayout: {
          order: "1",
          maxWidth: "30rem",
          margin: "auto"
        },
        descriptionLayout: {
          root: {
            order: "2",
            flex: "2",
            margin: "1em",
            flexShrink: "0"
          },
          text: {
            textAlign: "justify",
            minWidth: "50em"
          }
        },
        logo: {
          width: "auto",
          height: "100%",
          marginLeft: "auto",
          marginRight: "auto"
        }
      }
    };
  }
  addToCart = async () => {
    if (this.state.user && this.state.product) {
      const currentCart: ?CartType = await getCart(this.state.user.uid);
      let newCart: CartType;
      if (currentCart && currentCart.active && currentCart.itemCount) {
        newCart = {
          ...currentCart,
          uid: this.state.user.uid,
          itemCount: currentCart.itemCount + 1,
          items: [...currentCart.items, this.state.product]
        };
      } else {
        newCart = {
          uid: this.state.user.uid,
          itemCount: 1,
          items: [this.state.product],
          active: true
        };
      }
      addCartToFirebase("/cart/", newCart);
      this.setState({
        addedToCart: true
      });
    } else {
      this.setState({
        noUserDialog: true
      });
      console.log("You must login");
    }
  };

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false
    });
  };

  openLightbox = () => {
    this.setState({
      lightboxIsOpen: true
    });
  };
  openAddToCartDialog = () => {
    this.setState({
      addedToCart: true
    });
  };
  closeAddToCartDialog = () => {
    this.setState({
      addedToCart: false
    });
  };

  openNoUserDialog = () => {
    this.setState({
      noUserDialog: true
    });
  };
  closeNoUserDialog = () => {
    this.setState({
      noUserDialog: false
    });
  };
  triggerLightBox = (index: number) => {
    this.setState({
      lightboxIsOpen: true,
      currentImage: index
    });
  };

  listOtherPictures = (product: ArtPieceType) => {
    if (product) {
      const pictures: Array<string> = product.imagesLinks;
      if (pictures.length) {
        return pictures.map((picture, index) => {
          return (
            <GridListTile key={index}>
              <img
                src={picture}
                onClick={e => this.triggerLightBox(index)}
                alt={product.name}
              />
            </GridListTile>
          );
        });
      }
    }
  };

  lightboxImages = (imageLinks: Array<string>) => {
    return imageLinks.map(picture => {
      return { src: picture };
    });
  };

  listArtPieces() {
    if (this.state.artpieces && this.state.artist) {
      const filteredArtpieces = this.state.artpieces.filter(
        artpiece => artpiece.id !== this.state.productId
      );
      return filteredArtpieces.map((artpiece, index) => {
        return ArtPieceGrid(artpiece, index, this.state.artist.name);
      });
    }
  }

  render = () => {
    return (
      <div>
        <Header />
        <div className="body">
          <div style={this.styles().centered}>
            {!this.state.product && <CircularProgress size={90} />}
            {this.state.product &&
              this.state.product.imagesLinks &&
              this.state.product.imagesLinks.length && (
                <Image
                  style={this.styles().image}
                  src={this.state.product.imagesLinks[0]}
                  onClick={this.openLightbox}
                />
              )}
            {this.state.images && (
              <Lightbox
                images={this.state.images}
                isOpen={this.state.lightboxIsOpen}
                onClickNext={this.gotoNext}
                onClickPrev={this.gotoPrevious}
                onClose={this.closeLightbox}
                showImageCount={true}
                imageCountSeparator={" sur "}
                closeButtonTitle={"Fermer"}
                backdropClosesModal={true}
                currentImage={this.state.currentImage}
              />
            )}
          </div>
          <br />
          <div className="canvasTitle" style={this.styles().centered}>
            {this.state.product && this.state.product.name}
          </div>
          <Divider style={this.styles().divider} />
          <div style={this.styles().centered}>
            {this.state.artist &&
              this.state.product &&
              (this.state.product.year !== -1 &&
              this.state.product.year !== "" &&
              this.state.product.year !== "-1"
                ? `${this.state.artist.name}, ${this.state.product.year}`
                : `${this.state.artist.name}`)}
          </div>
          <div style={this.styles().buyArea}>
            {this.state.product && (
              <h2 style={this.styles().centered}>
                {this.state.product.sellPriceTaxIncluded}€
              </h2>
            )}
            <Button onClick={this.addToCart} style={this.styles().button}>
              Ajouter au panier
            </Button>
            <AlertDialogSlide
              open={this.state.addedToCart}
              handleRequestOpen={this.openAddToCartDialog}
              handleRequestClose={this.closeAddToCartDialog}
            />
            <AlertDialogNoUser
              open={this.state.noUserDialog}
              handleRequestOpen={this.openNoUserDialog}
              handleRequestClose={this.closeNoUserDialog}
            />
          </div>
          <br />
          <div>
            <h1>Détails</h1>
            <Divider style={this.styles().divider} />
            {!this.state.product && <CircularProgress size={90} />}
            {this.state.product && (
              <ListGroup>
                <ListGroupItem header="Description">
                  {this.state.product && this.state.product.description}
                </ListGroupItem>
                <ListGroupItem header="Dimensions">
                  {this.state.product &&
                    this.state.product.description !== "" &&
                    this.state.product.description !== "-1" &&
                    this.state.product.dimensions}
                </ListGroupItem>
                <ListGroupItem header="Nombre d'exemplaires">
                  {this.state.product &&
                    this.state.product.quantity !== "" &&
                    this.state.product.quantity !== "-1" &&
                    this.state.product.quantity !== -1 &&
                    this.state.product.quantity}
                </ListGroupItem>
                <ListGroupItem header="Année">
                  {this.state.product &&
                    this.state.product.year !== "" &&
                    this.state.product.year !== -1 &&
                    this.state.product.year !== "-1" &&
                    this.state.product.year}
                </ListGroupItem>
                <ListGroupItem header="Référence">
                  {this.state.product && this.state.product.reference}
                </ListGroupItem>
              </ListGroup>
            )}
          </div>
          {this.state.product &&
            this.state.product.imagesLinks.length > 1 && (
              <div>
                <h1>L'oeuvre sous tous ses angles</h1>
                <Divider style={this.styles().divider} />
                <GridList
                  cellHeight={300}
                  style={this.styles().gridList}
                  cols={4}
                >
                  {this.state.product &&
                    this.listOtherPictures(this.state.product)}
                </GridList>
              </div>
            )}
          <br />
          <h1>Un mot sur l'artiste...</h1>
          <Divider style={this.styles().divider} />
          {!this.state.artist && <CircularProgress size={90} />}
          <div style={this.styles().artistArea.root}>
            <div style={this.styles().artistArea.logoLayout}>
              {this.state.artist && (
                <Panel style={this.styles().paper}>
                  <Image
                    src={
                      this.state.artist.logo.length
                        ? this.state.artist.logo
                        : this.state.artist.picture
                    }
                    style={this.styles().artistArea.logo}
                  />
                </Panel>
              )}
            </div>
            <div style={this.styles().artistArea.descriptionLayout.root}>
              <p style={this.styles().artistArea.descriptionLayout.text}>
                {this.state.artist &&
                  `${this.state.artist.description.slice(
                    0,
                    Math.min(this.state.artist.description.length, 1000)
                  )}...`}
              </p>
              {this.state.artist && (
                <Button
                  href={`/artist/${this.state.artist.id}`}
                  style={this.styles().button}
                >
                  En savoir plus
                </Button>
              )}
            </div>
          </div>
          <br />
          <h1>Oeuvres associées à l'artiste</h1>
          <Divider style={this.styles().divider} />
          {!this.state.artpieces && <CircularProgress size={90} />}

          {this.state.artpieces && (
            <GridList cellHeight={300} style={this.styles().gridList} cols={4}>
              {this.listArtPieces()}
            </GridList>
          )}
          <br />
        </div>
        <Footer />
      </div>
    );
  };
}

export default Product;
