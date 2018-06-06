// @flow
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import banner from '../../assets/vue-galerie.jpg';
import '../../css/App.css';
import {
  getArtPieceFromArtType,
  getArtTypes,
} from '../../javascript/firebaseUtils';
import Footer from '../common/Footer';
import Header from '../common/Header';
import ArtPiecesGrid from '../artpieces/ArtPiecesGrid';
import ConditionalCircularProgress from '../common/ConditionalCircularProgress';

import type { ArtPieceType, ArtTypeType, XXX } from '../../types/types';

type Props = {
  category: XXX,
};
type State = {
  artpieces: ArtPieceType[],
  arttypes: ArtTypeType[],
};

class Category extends Component<Props, State> {
  state = {
    artpieces: [],
    arttypes: [],
  };

  componentWillMount() {
    (async () => {
      let artPieces: ArtPieceType[];
      const callbackTypes = (arttypes: ArtTypeType[]) => {
        this.setState({
          arttypes: arttypes.filter(
            (arttype: ArtTypeType) => arttype.id === this.props.category.id
          ),
        });
      };
      if (this.props.category) {
        artPieces = await getArtPieceFromArtType(this.props.category.id);
        getArtTypes(callbackTypes);
      }
      this.setState({
        artpieces: artPieces,
      });
    })();
  }

  styles() {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      categoryName: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        marginTop: '12em',
      },
      relative: {
        position: 'relative',
        width: '100%',
        height: '35em',
      },
      image: {
        height: '30em',
        width: '100%',
        position: 'absolute',
      },
      margin: {
        marginBottom: '1em',
      },
      name: {
        fontSize: '5em',
        textTransform: 'uppercase',
      },
    };
  }

  render() {
    return (
      <div>
        <Header />
        <div style={this.styles().root}>
          <div style={this.styles().relative}>
            <Image src={banner} style={this.styles().image} />
            <div style={this.styles().categoryName}>
              <div className="canvasTitle" style={this.styles().name}>
                {this.state.arttypes.length && this.state.arttypes[0].name}
              </div>
            </div>
          </div>
          <div className="body">
            {this.state.artpieces.length && (
              <h1> Les oeuvres correspondantes </h1>
            )}
            {!this.state.artpieces.length && (
              <h1> Aucune oeuvre pour le moment </h1>
            )}
            <Divider style={this.styles().margin} />
            <ConditionalCircularProgress
              predicate={this.state.artpieces.length === 0}
            />
            <ArtPiecesGrid
              artPieces={this.state.artpieces}
              artistName={''}
              gridSize={{ cellHeight: 300, cols: 4 }}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Category;
