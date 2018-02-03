//@flow
import React, { Component } from "react";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "material-ui/Dialog";
import Button from "material-ui/Button";

import ArtistForm from "./ArtistForm";

export default class AddArtistDialog extends Component {
  state: {
    open: boolean
  } = { open: this.props.artist ? true : false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.artist) {
      this.handleOpen();
    }
  }

  render() {
    return (
      <div>
        <Button raised onClick={this.handleOpen}>
          Ajouter un artiste
        </Button>
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
