// @flow
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import '../../css/App.css';
import {
  getLastArtPiece,
  getLastArtType,
  getLastArtist,
} from '../../javascript/firebaseUtils';
import ArtPiecesSection from './artPieces/ArtPiecesSection';
import ArtTypesSection from './artTypes/ArtTypesSection';
import ArtistsSection from './artists/ArtistsSection';

import type { ArtistType, ArtPieceType, ArtTypeType } from '../../types/types';

type State = {
  artists: ArtistType[],
  artPieces: ArtPieceType[],
  artTypes: ArtTypeType[],
};

type Props = {};

class Admin extends Component<Props, State> {
  state = {
    artists: [],
    artPieces: [],
    artTypes: [],
  };

  updateArtPiece = (artpiece: ArtPieceType) => {
    this.setState({
      artPieces: [...this.state.artPieces, artpiece],
    });
  };

  updateArtist = (artist: ArtistType) => {
    this.setState({
      artists: [...this.state.artists, artist],
    });
  };
  updateArtType = (artType: ArtTypeType) => {
    this.setState({
      artTypes: [...this.state.artTypes, artType],
    });
  };
  componentDidMount() {
    // TODO: if user is not authenticated go to Login
    getLastArtist(this.updateArtist);
    getLastArtPiece(this.updateArtPiece);
    getLastArtType(this.updateArtType);
  }

  render() {
    return (
      <div className={'root'}>
        <AppBar>
          <Toolbar>
            <Typography variant="display2" gutterBottom>
              Panneau d'administration
            </Typography>
          </Toolbar>
        </AppBar>
        <ArtistsSection artists={this.state.artists} />
        <ArtPiecesSection
          artPieces={this.state.artPieces}
          artists={this.state.artists}
          artTypes={this.state.artTypes}
        />
        <ArtTypesSection artTypes={this.state.artTypes} />
      </div>
    );
  }
}

export default Admin;