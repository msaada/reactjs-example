// @flow
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import '../Admin.css';
import Paginator from '../Pagination';
import ArtPiecesAdminList from './ArtPiecesAdminList';
import type {
  ArtPieceType,
  ArtistType,
  ArtTypeType,
} from '../../../types/types';

type Props = {
  artPieces: ArtPieceType[],
  artists: ArtistType[],
  artTypes: ArtTypeType[],
};

type State = {
  artpiecesActivePage: number,
};

export default class ArtPiecesSection extends Component<Props, State> {
  state: State = {
    artpiecesActivePage: 1,
  };
  handleSelectArtPieces = (index: number) => (event: SyntheticInputEvent<>) => {
    this.setState({
      artpiecesActivePage: index,
    });
  };
  render() {
    const { artPieces, artists, artTypes } = this.props;
    const itemsPerPage = 5;
    return (
      <Paper elevation={3} className="paper">
        <Toolbar>
          <Typography variant="display3" gutterBottom>
            Oeuvres
          </Typography>
        </Toolbar>
        <ConditionalCircularProgress predicate={artPieces.length === 0} />
        {artPieces.length && (
          <ArtPiecesAdminList
            artpieces={artPieces.slice(
              itemsPerPage * (this.state.artpiecesActivePage - 1),
              itemsPerPage * this.state.artpiecesActivePage
            )}
            artists={artists}
            arttypes={artTypes}
          />
        )}
        <Paginator
          items={artPieces}
          itemsPerPage={itemsPerPage}
          className="centered"
          onSelect={this.handleSelectArtPieces}
          activePage={this.state.artpiecesActivePage}
        />
      </Paper>
    );
  }
}
