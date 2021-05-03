import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Component } from 'react';
import AddArtistDialog from './AddArtistDialog';


export default class ArtistAdminList extends Component {
  state = {
    chosenArtist: null,
  };

  clearArtist = () => {
    this.setState({
      chosenArtist: null,
    });
  };
  chooseArtist = (artist) => () =>
    this.setState({
      chosenArtist: artist,
    });

  render() {
    return (
      <List>
        {this.props.artists.map((artist, pos) => (
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
