import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import '../../css/App.css';
import {
  getArtPieceFromArtist,
  getArtist,
} from '../../javascript/firebaseUtils';
import Footer from '../common/Footer';
import Header from '../common/Header';
import ArtPiecesGrid from '../artpieces/ArtPiecesGrid';
import ArtistPicture from './ArtistPicture';
import { checkPartnership } from './partnership';

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lightboxIsOpen: false,
      artistId: '',
      artpieces: [],
      artist: null,
    };
  }

  componentDidMount() {
    (async () => {
      this.setState({
        artistId: this.props.params.artistId,
      });

      const dataArtist = await getArtist(this.props.params.artistId);
      if (dataArtist) {
        ReactGA.pageview(dataArtist.name);

        this.setState({
          artist: dataArtist,
        });
      }
      const dataArtpieces = await getArtPieceFromArtist(
        this.props.params.artistId
      );
      this.setState({
        artpieces: dataArtpieces,
        isLoading: false,
      });
    })();
  }

  styles() {
    return {
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      descriptionArea: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'justify',
        fontSize: '1.5em',
      },
      divider: {
        marginBottom: '1em',
      },
      artistPhotoArea: {
        display: 'flex',
        justifyContent: 'center',
        height: '40em',
      },
      image: {
        height: '100%',
        width: 'auto',
      },
      partnership: {
        display: 'flex',
        justifyContent: 'center',
        fontStyle: 'italic',
      },
    };
  }

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

  conditionalPartnership = () => {
    if (checkPartnership(this.state.artistId)) {
      return <div>En partenariat avec la galerie Palmer – Paris 6ème</div>;
    }
  };
  conditionalDescription = () => {
    if (this.state.artist && this.state.artist.description.length) {
      return (
        <div>
          <div className="canvasTitle">Biographie</div>
          <Divider style={this.styles().divider} />
          <p style={this.styles().descriptionArea}>
            {this.state.artist && this.state.artist.description}
          </p>
        </div>
      );
    }
  };

  render = () => {
    return (
      <div>
        <Header />
        <div className="body">
          <ArtistPicture artist={this.state.artist} />

          <div style={this.styles().centered}>
            <h1> {this.state.artist && this.state.artist.name}</h1>
          </div>
          <Divider style={this.styles().divider} />
          <div style={this.styles().partnership}>
            {this.conditionalPartnership()}
          </div>
          <br />
          {this.conditionalDescription()}
          <br />
          <div className="canvasTitle">Oeuvres</div>
          <Divider style={this.styles().divider} />
          <ArtPiecesGrid
            artPieces={this.state.artpieces}
            artistName={this.state.artist ? this.state.artist.name : ''}
          />
          <br />
        </div>
        <Footer />
      </div>
    );
  };
}

export default Artist;
