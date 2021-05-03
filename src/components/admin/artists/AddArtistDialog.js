import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';
import ArtistForm from './ArtistForm';

export default class AddArtistDialog extends Component {
  state = {
     open: this.props.artist ? true : false 
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.resetFields();
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.artist) {
      this.handleOpen();
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen}>Ajouter un artiste</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
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
