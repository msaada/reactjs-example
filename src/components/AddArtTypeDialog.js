//@flow
import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import ArtTypeForm from "./ArtTypeForm";

export default class AddArtTypeDialog extends Component {
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
        <RaisedButton
          label="Ajouter un type d'oeuvre"
          onClick={this.handleOpen}
        />
        <Dialog
          title="Ajouter un type d'oeuvre"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Tous les champs sont requis.
          <ArtTypeForm />
        </Dialog>
      </div>
    );
  }
}
