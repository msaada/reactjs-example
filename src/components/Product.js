// @flow
import React, { Component } from "react";

import type { ArtPieceType, ArtistType } from "../types/types";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";
import { GridTile, GridList } from "material-ui/GridList";

import Paper from "material-ui/Paper";
import CircularProgress from "material-ui/CircularProgress";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";

import { ArtPieceGrid } from "./ArtPieceGrid";
import { Image } from "react-bootstrap";
import { browserHistory } from "react-router";

import { getArtPiece2, getArtist2 } from "../javascript/firebaseUtils";

import Lightbox from "react-images";

class Product extends Component {
  state: {
    isLoading: boolean,
    lightboxIsOpen: boolean,
    productId: string,
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
    await this.setStateAsync({
      ...this.state,
      productId: this.props.params.productId
    });

    const dataProduct: ArtPieceType = await getArtPiece2(
      this.props.params.productId
    );
    console.log(dataProduct);
    const dataArtist: ArtistType = await getArtist2(dataProduct.artistId);
    console.log(dataArtist);
    await this.setStateAsync({
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
        justifyContent: "center"
      },
      gridList: {
        overflowY: "auto",
        display: "flex",
        justifyContent: "center"
      },
      artistArea: {
        root: {
          display: "inline-flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        logoLayout: {
          order: "1",
          flex: "1",
          margin: "auto"
        },
        descriptionLayout: {
          order: "2",
          flex: "2",
          margin: "1em",
          textAlign: "justify"
        },
        logo: {
          width: "50%",
          height: "50%"
        }
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

  listOtherPictures = (product: ArtPieceType) => {
    if (product) {
      const pictures: Array<string> = product.imagesLinks;
      if (pictures.length) {
        return pictures.map((picture, index) => {
          return (
            <GridTile key={index}>
              <img src={picture} />
            </GridTile>
          );
        });
      }
    }
  };

  render = () => {
    return (
      <div>
        <Header />
        <div className="body">
          <div style={this.styles().centered}>
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
          </div>
          <br />
          <div className="canvasTitle" style={this.styles().centered}>
            {this.state.product && this.state.product.name}
          </div>
          <Divider style={this.styles().divider} />
          <div style={this.styles().centered}>
            {this.state.artist &&
              `${this.state.artist.name}, ${this.state.product.year}`}
          </div>
          <div style={this.styles().buyArea}>
            {this.state.product && (
              <h4 style={this.styles().centered}>
                {this.state.product.sellPriceTaxIncluded}€
              </h4>
            )}
            {this.state.product && (
              <p style={this.styles().centered}>
                {this.state.product && this.state.product.description}
              </p>
            )}
            <FlatButton label="Ajouter au panier" />
          </div>

          <h1>Un mot sur l'artiste...</h1>
          <Divider style={this.styles().divider} />
          <div style={this.styles().artistArea.root}>
            <div style={this.styles().artistArea.logoLayout}>
              {this.state.artist && (
                <Paper zDepth={2} style={this.styles().paper}>
                  <Image
                    src={this.state.artist.logo}
                    style={this.styles().artistArea.logo}
                    onClick={e =>
                      browserHistory.push(`/artist/${this.state.artist.id}`)}
                  />
                </Paper>
              )}
            </div>
            <p style={this.styles().artistArea.descriptionLayout}>
              {this.state.artist && this.state.artist.description}
            </p>
          </div>
          <br />
          {this.state.product &&
            this.state.product.imagesLinks.length > 1 && (
              <div>
                <div className="canvasTitle">Plus de photos</div>
                <Divider style={this.styles().divider} />
                <GridList
                  cellHeight={300}
                  style={this.styles().gridList}
                  cols={4}
                  padding={10}
                >
                  {this.state.product &&
                    this.listOtherPictures(this.state.product)}
                </GridList>
              </div>
            )}
        </div>
        <Footer />
      </div>
    );
  };
}

export default Product;
