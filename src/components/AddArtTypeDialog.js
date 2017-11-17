//@flow
import React, { Component } from "react";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import ArtTypeForm from "./ArtTypeForm";

export default class AddArtTypeDialog extends Component {
  state: {
    open: boolean
  } = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* <Button onClick={this.handleOpen}>Ajouter un type d'oeuvre</Button>
        <Dialog
          title="Ajouter un type d'oeuvre"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Tous les champs sont requis.
          <ArtTypeForm />
        </Dialog> */}
        <Button raised onClick={this.handleOpen}>
          Ajouter un type d'oeuvre
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.handleClose}>
          <DialogTitle>Ajouter un type d'oeuvre</DialogTitle>
          <DialogContent>
            <DialogContentText>Tous les champs sont requis.</DialogContentText>
            <ArtTypeForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Annuler</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
