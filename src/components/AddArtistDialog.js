//@flow
import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import ArtistForm from "./ArtistForm";

export default class AddArtistDialog extends Component {
  state: {
    open: boolean
  };

  constructor(props: any) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Annuler"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <RaisedButton label="Ajouter un artiste" onClick={this.handleOpen} />
        <Dialog
          title="Ajouter un artiste"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          Tous les champs sont requis.
          <ArtistForm />
        </Dialog>
      </div>
    );
  }
}
