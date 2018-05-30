//@flow
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import React, { Component } from 'react';
import AddArtistDialog from './AddArtistDialog';

import type { ArtistType } from '../../../types/types';

type Props = {
  artists: ArtistType[],
};

type State = {
  chosenArtist: ?ArtistType,
};

export default class ArtistAdminList extends Component<Props, State> {
  state = {
    chosenArtist: null,
  };

  clearArtist = () => {
    this.setState({
      chosenArtist: null,
    });
  };
  chooseArtist = (artist: ArtistType) => () =>
    this.setState({
      chosenArtist: artist,
    });

  render() {
    return (
      <List>
        {this.props.artists.map((artist: ArtistType, pos: number) => (
          <ListItem key={pos} dense button onClick={this.chooseArtist(artist)}>
            <Avatar
              alt={artist.name}
              src={artist.logo ? artist.logo : artist.picture}
            />
            <ListItemText primary={artist.name} />
          </ListItem>
        ))}
        <ListItem>
          <AddArtistDialog
            artist={this.state.chosenArtist}
            resetFields={this.clearArtist}
          />
        </ListItem>
      </List>
    );
  }
}
