//@flow
import React, { Component } from "react";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "material-ui/Dialog";
import Button from "material-ui/Button";

import ArtPieceForm from "./ArtPieceForm";

export default class AddArtPieceDialog extends Component {
  state: {
    open: boolean
  } = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button raised onClick={this.handleOpen}>
          Ajouter une oeuvre
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.handleClose}>
          <DialogTitle>Ajouter une oeuvre</DialogTitle>
          <DialogContent>
            <DialogContentText>Tous les champs sont requis.</DialogContentText>
            <ArtPieceForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Annuler</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
