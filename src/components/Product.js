// @flow
import React, { Component } from "react";

import type { ArtPieceType, ArtistType } from "../types/types";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import Paper from "material-ui/Paper";
import CircularProgress from "material-ui/CircularProgress";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";

import { Image } from "react-bootstrap";

import {
  getArtPiece,
  getArtPiece2,
  getArtist,
  getArtist2
} from "../javascript/firebaseUtils";
import Avatar from "material-ui/Avatar";
import Lightbox from "react-images";

class Product extends Component {
  state: {
    isLoading: boolean,
    lightboxIsOpen: boolean,
    productId: string,
    // TODO REMOVE
    product: ArtPieceType,
    artist: ArtistType
  };

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      lightboxIsOpen: false,
      productId: ""
    };
  }

  async componentWillMount() {
    this.setState({
      ...this.state,
      productId: this.props.params.productId
    });

    const dataProduct: ArtPieceType = await getArtPiece2(this.state.productId);
    const dataArtist: ArtistType = dataProduct
      ? await getArtist2(dataProduct[this.state.productId].artistId)
      : null;

    this.setState({
      artist: dataArtist,
      product: dataProduct
    });
  }

  styles() {
    return {
      root: {
        display: "flex",
        justifyContent: "space-between"
      },
      image: {
        width: "30em",
        height: "30em",
        flexGrow: "1",
        margin: "1em"
      },
      divider: {
        marginBottom: "1em"
      },
      buyArea: {
        display: "flex",
        flexGrow: "2",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "stretch"
      },
      centered: {
        display: "flex",
        justifyContent: "center"
      },
      paper: {
        width: "auto",
        height: "auto"
      }
    };
  }

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
  render = () => {
    return (
      <div>
        <Header />
        <div className="body">
          <div className="canvasTitle" style={this.styles().centered}>
            {this.state.product && this.state.product.name}
          </div>
          {this.state.artist && this.state.artist.firstName}
          <Divider style={this.styles().divider} />
          <div style={this.styles().root}>
            {this.state.product && (
              <Image
                style={this.styles().image}
                src={this.state.product.imagesLinks[0]}
                onClick={this.openLightbox}
              />
            )}
            {this.state.product && (
              <Lightbox
                images={[{ src: this.state.product.imagesLinks[0] }]}
                isOpen={this.state.lightboxIsOpen}
                onClose={this.closeLightbox}
                showImageCount={false}
                closeButtonTitle={"Fermer"}
                backdropClosesModal={true}
              />
            )}
            <div style={this.styles().buyArea}>
              <Paper style={this.styles().paper}>
                {this.state.product && (
                  <h3 style={this.styles().centered}>
                    {this.state.product.sellPriceTaxIncluded}€
                  </h3>
                )}
                <FlatButton label="Ajouter au panier" />
              </Paper>
            </div>
          </div>
          <h1>Un mot sur l'artiste...</h1>
          <div>
            <Divider style={this.styles().divider} />
            {this.state.artist && (
              <Avatar src={this.state.artist.picture} size={100} />
            )}
            {this.state.artist && (
              <Image
                src={this.state.artist.picture}
                width={50}
                height={30}
                thumbnail
              />
            )}
          </div>
          <h1>Description</h1>
          <Divider style={this.styles().divider} />
          <p>{this.state.product && this.state.product.description}</p>
          <h1>Plus de photos</h1>
        </div>
        <Footer />
      </div>
    );
  };
}

export default Product;
