//@flow
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import React, { Component } from 'react';
import ArtistForm from './ArtistForm';

import type { ArtistType } from '../../../types/types';

type State = {
  open: boolean,
};
type Props = {
  artist: ?ArtistType,
  resetFields: () => void,
};

export default class AddArtistDialog extends Component<Props, State> {
  state: {
    open: boolean,
  } = { open: this.props.artist ? true : false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.resetFields();
  };
  componentWillReceiveProps(nextProps: { artist?: ?ArtistType }) {
    if (nextProps.artist) {
      this.handleOpen();
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen}>Ajouter un artiste</Button>
        <Dialog open={this.state.open} onRequestClose={this.handleClose}>
          <DialogTitle>Ajouter un artiste</DialogTitle>
          <DialogContent>
            <DialogContentText>Tous les champs sont requis.</DialogContentText>
            <ArtistForm defaultArtist={this.props.artist} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Terminer</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
