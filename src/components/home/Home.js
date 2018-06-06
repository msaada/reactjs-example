// @flow

import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import ReactGA from 'react-ga';
import '../../css/App.css';
import { getArtPieces, getArtists } from '../../javascript/firebaseUtils';
import Footer from '.././common/Footer';
import Header from '.././common/Header';
import ArtPiecesGrid from '../artpieces/ArtPiecesGrid';
import ConditionalCircularProgress from '../common/ConditionalCircularProgress';
import { ArtistHomeGrid } from './ArtistHomeGrid';

import type { ArtistType, ArtPieceType } from '../../types/types';

type Props = {};
type State = {
  artists: ArtistType[],
  artpieces: ArtPieceType[],
};
class Home extends Component<Props, State> {
  state: State = {
    artists: [],
    artpieces: [],
  };

  componentWillMount() {
    const callbackArtists = dataArtists => {
      this.setState({
        artists: dataArtists,
      });
    };
    getArtists(callbackArtists);

    const callbackArtpieces = dataArtpieces => {
      this.setState({
        artpieces: dataArtpieces,
      });
    };
    getArtPieces(callbackArtpieces);
  }
  componentDidMount() {
    ReactGA.pageview('acceuil');
  }

  styles() {
    return {
      gridList: {
        overflowY: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      divider: {
        color: '#ff7e17',
        marginTop: '0.5em',
        marginBottom: '3em',
      },
      category: {
        marginBottom: '2em',
      },
      image: {
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
      },
      relative: {
        position: 'relative',
        width: '100%',
        height: '35em',
      },
      slides: {
        root: {
          marginTop: '2em',
        },
        image: {
          height: '30em',
          width: '100%',
          position: 'absolute',
        },
        catchphrase: {
          display: 'flex',
          position: 'absolute',
          justifyContent: 'center',
          width: '100%',
          marginTop: '12em',
          color: '#FFFFFF',
        },
      },
      titleBar: {
        background: 'rgba(0,0,0,0.15)',
        height: '2.5em',
      },
    };
  }

  listArtists() {
    if (this.state.artists) {
      const featuredArtists = this.state.artists.filter(
        (e: ArtistType) => (e.featured ? e.featured : false)
      );
      return featuredArtists.map((artist, index) => {
        return ArtistHomeGrid(artist, index);
      });
    }
  }

  render() {
    console.log(this.styles().gridList);
    return (
      <div className="Home">
        <Header />
        <div style={this.styles().slides.root}>
          <div style={this.styles().relative}>
            <Image
              src={require('../../assets/home.jpg')}
              style={this.styles().slides.image}
            />
            <div style={this.styles().slides.catchphrase}>
              <h1
                style={{
                  textAlign: 'center',
                  fontStyle: 'italic',
                  fontSize: '2.5rem',
                }}
              >
                Bienvenue dans notre nouveau concept store, la Mega Dental Art
                Gallery.
              </h1>
            </div>
          </div>
        </div>
        <div className="body">
          <div style={this.styles().category}>
            <div style={this.styles().centered}>
              <h1>Nouveautés</h1>
            </div>
            <Divider style={this.styles().divider} />
            <ConditionalCircularProgress
              predicate={this.state.artpieces.length === 0}
            />
            <ArtPiecesGrid
              artPieces={this.state.artpieces.filter(
                (e: ArtPieceType) => (e.featured ? e.featured : false)
              )}
              artistName={''}
              hasSeeMoreTyle
            />
          </div>
          <div style={this.styles().category}>
            <div style={this.styles().centered}>
              <h1>Artistes du moment</h1>
            </div>
            <Divider style={this.styles().divider} />

            <ConditionalCircularProgress
              predicate={this.state.artists.length === 0}
            />
            <GridList cellHeight={300} style={this.styles().gridList} cols={4}>
              {this.listArtists()}
              <GridListTile key={4}>
                <GridListTileBar
                  title="Voir plus d'artistes..."
                  style={this.styles().titleBar}
                />

                <Image
                  src={require('../../assets/more.jpg')}
                  alt="Voir plus d'artistes"
                  style={this.styles().image}
                  onClick={e => (window.location.href = '/artistes')}
                />
              </GridListTile>
            </GridList>
          </div>
          <div style={this.styles().category}>
            <div style={this.styles().centered}>
              <h1>Notre Sélection</h1>
            </div>
            <Divider style={this.styles().divider} />

            <ConditionalCircularProgress
              predicate={this.state.artpieces.length === 0}
            />
            <ArtPiecesGrid
              artPieces={this.state.artpieces.slice(3, 7)}
              artistName={''}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
