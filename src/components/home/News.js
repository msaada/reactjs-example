import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import mainImage from '../../assets/vue-galerie.jpg';
import '../../css/App.css';
import { getArtPieces } from '../../javascript/firebaseUtils';
import ArtPiecesGrid from '../artpieces/ArtPiecesGrid';
import ConditionnalCircularProgress from '../common/ConditionalCircularProgress';
import Footer from '../common/Footer';
import Header from '../common/Header';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artpieces: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    const callbackArtpieces = dataArtpieces => {
      this.setState({
        ...this.state,
        artpieces: dataArtpieces.slice(0, Math.min(12, dataArtpieces.length)),
        isLoading: false,
      });
    };
    getArtPieces(callbackArtpieces);
  }

  styles() {
    return {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
      },
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      divider: {
        marginTop: '0.5em',
        marginBottom: '3em',
      },
      category: {
        marginBottom: '2em',
      },
      image: {
        height: '30em',
        width: '100%',
        position: 'absolute',
      },
      relative: {
        position: 'relative',
        width: '100%',
        height: '35em',
      },
      absolute: {
        position: 'absolute',
      },
      name: {
        fontSize: '5em',
        textTransform: 'uppercase',
      },
      categoryName: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        marginTop: '12em',
      },
    };
  }

  render() {
    return (
      <div className="News">
        <Header />
        <div className style={this.styles().root}>
          <div style={this.styles().relative}>
            <Image src={mainImage} style={this.styles().image} />
            <div style={this.styles().categoryName}>
              <div className="canvasTitle" style={this.styles().name}>
                Nouveautés
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div style={this.styles().category}>
            <h1>Les oeuvres correspondantes</h1>
            <Divider style={this.styles().divider} />

            <ConditionnalCircularProgress predicate={this.state.isLoading} />
            <ArtPiecesGrid artPieces={this.state.artpieces} artistName={''} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default News;
