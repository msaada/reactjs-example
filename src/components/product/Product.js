// @flow
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import GridList, { GridListTile } from 'material-ui/GridList';
import React, { Component } from 'react';
import { Image, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import Lightbox from 'react-images';
import '../../css/App.css';
import {
  addCartToFirebase,
  auth,
  getArtPiece,
  getArtPieceFromArtist,
  getArtist,
  getCart,
} from '../../javascript/firebaseUtils';
import Footer from '../common/Footer';
import Header from '../common/Header';
import ArtPiecesGrid from '../artpieces/ArtPiecesGrid';
import ConditionalCircularProgress from '../common/ConditionalCircularProgress';
import AlertDialogNoUser from './AlertDialogNoUser';
import AlertDialogReserved from './AlertDialogReserved';
import { AlertDialogSlide } from './AlertDialogSlide';
import type { Element } from 'react';
import type {
  ArtPieceType,
  ArtistType,
  CartType,
  FirebaseUser,
} from '../../types/types';

type Props = {
  params: {
    productId: string,
  },
};

type State = {
  isLoading: boolean,
  lightboxIsOpen: boolean,
  productId: string,
  product: ?ArtPieceType,
  artist: ?ArtistType,
  images: { src: string }[],
  artpieces: ArtPieceType[],
  currentImage: number,
  user: ?FirebaseUser,
  addedToCart: boolean,
  noUserDialog: boolean,
  reservedDialog: boolean,
};

class Product extends Component<Props, State> {
  state = {
    isLoading: true,
    lightboxIsOpen: false,
    productId: '',
    product: null,
    artist: null,
    images: [],
    artpieces: [],
    currentImage: 0,
    user: null,
    addedToCart: false,
    noUserDialog: false,
    reservedDialog: false,
  };
  componentWillReceiveProps(nextProps: Props) {
    (async () => {
      // TODO: force update when product change
      if (nextProps.params.productId !== this.props.params.productId) {
        console.log('update');
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
      ...this.state,
      productId: this.props.params.productId,
    });

    let dataProduct: ?ArtPieceType;
    if (!this.state.product) {
      if (this.props.params) {
        dataProduct = await getArtPiece(this.props.params.productId);
        this.setState({
          product: dataProduct,
        });
      }
    }

    let dataArtist: ?ArtistType;
    if (!this.state.artist) {
      if (dataProduct) {
        dataArtist = await getArtist(dataProduct.artistId);
        this.setState({
          artist: dataArtist,
        });
      }
    }
    let images: { src: string }[];
    if (dataProduct) {
      images = this.lightboxImages(dataProduct.imagesLinks);
      this.setState({
        images: images,
      });
    }

    if (this.state.artist && !this.state.artpieces.length) {
      const dataArtpieces: ArtPieceType[] = await getArtPieceFromArtist(
        this.state.artist.id
      );
      this.setState({
        artpieces: dataArtpieces,
        isLoading: false,
      });
    }
    this.setState({
      isLoading: false,
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
        display: 'flex',
        justifyContent: 'space-between',
      },
      image: {
        display: 'flex',
        justifyContent: 'center',
        width: '40%',
        height: '40%',
      },
      divider: {
        marginBottom: '1em',
      },
      buyArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      paper: {
        display: 'flex',
        justifyContent: 'center',
        height: '20em',
        textAlign: 'center',
        width: '100%',
      },
      gridList: {
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
      },
      button: {
        fontFamily: 'Din',
      },
      artistArea: {
        root: {
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        logoLayout: {
          order: '1',
          maxWidth: '30rem',
          margin: 'auto',
        },
        descriptionLayout: {
          root: {
            order: '2',
            flex: '2',
            margin: '1em',
            flexShrink: '0',
          },
          text: {
            textAlign: 'justify',
            minWidth: '50em',
          },
        },
        logo: {
          width: 'auto',
          height: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    };
  }
  addToCart = async () => {
    if (this.state.product && this.state.product.reserved) {
      this.setState({
        reservedDialog: true,
      });
    } else {
      if (this.state.user && this.state.product) {
        const user = this.state.user;
        const currentCart: ?CartType = await getCart(user.uid);
        let newCart: CartType;
        if (currentCart && currentCart.active && currentCart.itemCount) {
          newCart = {
            ...currentCart,
            id: user.uid,
            itemCount: currentCart.itemCount + 1,
            items: [...currentCart.items, this.state.product],
          };
        } else {
          newCart = {
            id: user.uid,
            itemCount: 1,
            items: [this.state.product],
            active: true,
          };
        }
        addCartToFirebase(newCart);
        this.setState({
          addedToCart: true,
        });
      } else {
        this.setState({
          noUserDialog: true,
        });
        console.log('You must login');
      }
    }
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
  triggerLightBox = (index: number) => {
    this.setState({
      lightboxIsOpen: true,
      currentImage: index,
    });
  };

  listOtherPictures: (
    product: ArtPieceType
  ) => Element<any>[] | void = product => {
    if (product) {
      const pictures: string[] = product.imagesLinks;
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

  lightboxImages: (imageLinks: string[]) => { src: string }[] = imageLinks => {
    return imageLinks.map(picture => {
      return { src: picture };
    });
  };

  render = () => {
    const {
      product,
      currentImage,
      images,
      lightboxIsOpen,
      artist,
      artpieces,
      addedToCart,
      noUserDialog,
      reservedDialog,
    } = this.state;
    return (
      <div>
        <Header />
        <div className="body">
          <div style={this.styles().centered}>
            <ConditionalCircularProgress predicate={product === null} />
            {product &&
              product.imagesLinks &&
              product.imagesLinks.length && (
                <Image
                  style={this.styles().image}
                  src={product.imagesLinks[0]}
                  onClick={this.openLightbox}
                />
              )}
            {images && (
              <Lightbox
                images={images}
                isOpen={lightboxIsOpen}
                onClickNext={this.gotoNext}
                onClickPrev={this.gotoPrevious}
                onClose={this.closeLightbox}
                showImageCount={true}
                imageCountSeparator={' sur '}
                closeButtonTitle={'Fermer'}
                backdropClosesModal={true}
                currentImage={currentImage}
              />
            )}
          </div>
          <br />
          <div className="canvasTitle" style={this.styles().centered}>
            {product && product.name}
          </div>
          <Divider style={this.styles().divider} />
          <div style={this.styles().centered}>
            {artist &&
              product &&
              (product.year !== -1 &&
              product.year !== '' &&
              product.year !== '-1'
                ? `${artist.name}, ${product.year}`
                : `${artist.name}`)}
          </div>
          <div style={this.styles().buyArea}>
            {product && (
              <h2 style={this.styles().centered}>
                {product.sellPriceTaxIncluded}€
              </h2>
            )}
            <Button onClick={this.addToCart} style={this.styles().button}>
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
          <br />
          <div>
            <h1>Détails</h1>
            <Divider style={this.styles().divider} />
            <ConditionalCircularProgress predicate={product === null} />
            {product && (
              <ListGroup>
                <ListGroupItem header="Description">
                  {product && product.description}
                </ListGroupItem>
                <ListGroupItem header="Dimensions">
                  {product &&
                    product.dimensions !== '' &&
                    product.dimensions !== '-1' &&
                    product.dimensions}
                </ListGroupItem>
                <ListGroupItem header="Nombre d'exemplaires">
                  {product &&
                    product.quantity !== '' &&
                    product.quantity !== '-1' &&
                    product.quantity !== -1 &&
                    product.quantity}
                </ListGroupItem>
                <ListGroupItem header="Année">
                  {product &&
                    product.year !== '' &&
                    product.year !== -1 &&
                    product.year !== '-1' &&
                    product.year}
                </ListGroupItem>
                <ListGroupItem header="Référence">
                  {product && product.reference}
                </ListGroupItem>
              </ListGroup>
            )}
          </div>
          {product &&
            product.imagesLinks.length > 1 && (
              <div>
                <h1>L'oeuvre sous tous ses angles</h1>
                <Divider style={this.styles().divider} />
                <GridList
                  cellHeight={300}
                  style={this.styles().gridList}
                  cols={4}
                >
                  {product && this.listOtherPictures(product)}
                </GridList>
              </div>
            )}
          <br />
          <h1>Un mot sur l'artiste...</h1>
          <Divider style={this.styles().divider} />

          <ConditionalCircularProgress predicate={artist === null} />

          <div style={this.styles().artistArea.root}>
            <div style={this.styles().artistArea.logoLayout}>
              {artist && (
                <Panel style={this.styles().paper}>
                  <Image
                    src={artist.logo.length ? artist.logo : artist.picture}
                    style={this.styles().artistArea.logo}
                  />
                </Panel>
              )}
            </div>
            <div style={this.styles().artistArea.descriptionLayout.root}>
              <p style={this.styles().artistArea.descriptionLayout.text}>
                {artist &&
                  `${artist.description.slice(
                    0,
                    Math.min(artist.description.length, 1000)
                  )}...`}
              </p>
              {artist && (
                <Button
                  href={`/artist/${artist.id}`}
                  style={this.styles().button}
                >
                  En savoir plus
                </Button>
              )}
            </div>
          </div>
          <br />
          {artpieces.length > 1 && (
            <div>
              <h1>Oeuvres associées à l'artiste</h1>
              <Divider style={this.styles().divider} />
              <ConditionalCircularProgress predicate={artpieces.length === 0} />
              <ArtPiecesGrid
                artPieces={artpieces.filter(
                  artpiece => artpiece.id !== this.state.productId
                )}
                artistName={artist ? artist.name : ''}
              />
              <br />
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  };
}

export default Product;
