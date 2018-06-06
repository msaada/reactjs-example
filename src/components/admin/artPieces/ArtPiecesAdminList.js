//@flow
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Component } from 'react';
import AddArtPieceDialog from './AddArtPieceDialog';

import type {
  ArtistType,
  ArtPieceType,
  ArtTypeType,
} from '../../../types/types';

type Props = {
  artists: ArtistType[],
  artpieces: ArtPieceType[],
  arttypes: ArtTypeType[],
};

type State = {
  chosenArtPiece: ?ArtPieceType,
};

export default class ArtpiecesAdminList extends Component<Props, State> {
  state = {
    chosenArtPiece: null,
  };

  clearArtPiece = () => {
    this.setState({
      chosenArtPiece: null,
    });
  };
  chooseArtpiece = (artpiece: ArtPieceType) => () =>
    this.setState({
      chosenArtPiece: artpiece,
    });

  render() {
    return (
      <List>
        {this.props.artpieces.map((artpiece: ArtPieceType, pos: number) => (
          <ListItem
            key={pos}
            dense
            button
            onClick={this.chooseArtpiece(artpiece)}
          >
            <Avatar
              alt={artpiece.name}
              src={
                artpiece.imagesLinks && artpiece.imagesLinks.length
                  ? artpiece.imagesLinks[0]
                  : ''
              }
            />
            <ListItemText primary={artpiece.name} />
          </ListItem>
        ))}
        <ListItem>
          <AddArtPieceDialog
            artists={this.props.artists}
            arttypes={this.props.arttypes}
            artpiece={this.state.chosenArtPiece}
            resetFields={this.clearArtPiece}
          />
        </ListItem>
      </List>
    );
  }
}
