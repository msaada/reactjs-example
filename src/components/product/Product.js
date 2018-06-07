// @flow
import React, { Component } from 'react';
import '../../css/App.css';
import {
  auth,
  getArtPiece,
  getArtPieceFromArtist,
  getArtist,
} from '../../javascript/firebaseUtils';
import Footer from '../common/Footer';
import Header from '../common/Header';

import RelatedArtPieces from './RelatedArtPieces';
import ProductDetails from './ProductDetails';
import ProductExtraImages from './ProductExtraImages';
import ProductTitle from './ProductTitle';
import ProductImages from './ProductImages';
import ArtistDescription from './ArtistDescription';
import BuyProduct from './BuyProduct';

import type { ArtPieceType, ArtistType, FirebaseUser } from '../../types/types';

type Props = {
  params: {
    productId: string,
  },
};

type State = {
  isLoading: boolean,
  product: ?ArtPieceType,
  productId: string,
  artist: ?ArtistType,
  artpieces: ArtPieceType[],
  currentImage: number,
  lightboxIsOpen: boolean,
  user: ?FirebaseUser,
};

class Product extends Component<Props, State> {
  state = {
    isLoading: true,
    product: null,
    productId: '',
    artist: null,
    artpieces: [],
    currentImage: 0,
    lightboxIsOpen: false,
    user: null,
  };
  componentWillReceiveProps(nextProps: Props) {
    (async () => {
      if (nextProps.params.productId !== this.props.params.productId) {
        console.info('Update the current product displayed');
        this.setState({
          product: null,
        });
        await this.getInfosFromFirebase();
      }
    })();
  }

  getInfosFromFirebase = async () => {
    if (auth) {
      await auth.onAuthStateChanged((user: FirebaseUser) => {
        this.setState({ user: user });
      });
    }

    this.setState({
      product: await getArtPiece(this.props.params.productId),
    });
    // Avoid reloading info about artist we we already have them
    if (this.state.product && !this.state.artist) {
      this.setState({
        artist: await getArtist(this.state.product.artistId),
      });
    }

    // Avoid reloading info about artpieces we we already have them
    if (this.state.artist && !this.state.artpieces.length) {
      this.setState({
        artpieces: await getArtPieceFromArtist(this.state.artist.id),
      });
    }

    this.setState({
      isLoading: false,
    });
  };

  componentDidMount() {
    (async () => {
      await this.getInfosFromFirebase();
    })();
  }

  triggerLightBox = (index: number) => {
    this.setState({
      lightboxIsOpen: true,
      currentImage: index,
    });
  };
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  };
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  };

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
    });
  };

  openLightbox = () => {
    this.setState({
      lightboxIsOpen: true,
    });
  };
  render = () => {
    const { product, artist, artpieces, user } = this.state;
    const productId = this.props.params.productId;
    return (
      <div>
        <Header />
        <div className="body">
          <ProductImages
            product={product}
            currentImage={this.state.currentImage}
            lightboxIsOpen={this.state.lightboxIsOpen}
            gotoPrevious={this.gotoPrevious}
            gotoNext={this.gotoNext}
            closeLightbox={this.closeLightbox}
            openLightbox={this.openLightbox}
          />
          <ProductTitle
            product={product}
            artistName={artist ? artist.name : ''}
          />
          <BuyProduct product={product} user={user} />
          <ProductDetails product={product} />
          <ProductExtraImages
            product={product}
            triggerLightBox={this.triggerLightBox}
          />
          <ArtistDescription artist={artist} />
          <RelatedArtPieces
            artPieces={artpieces}
            artist={artist}
            currentProductId={productId}
          />
        </div>
        <Footer />
      </div>
    );
  };
}

export default Product;
