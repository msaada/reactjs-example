import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';
import ArtPieceForm from './ArtPieceForm';

export default class AddArtPieceDialog extends Component {
  state = {
    open: false,
  };
  constructor(props) {
    super(props);
    this.setState({
      open: this.props.artpiece ? true : false,
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.resetFields();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.artpiece) {
      this.handleOpen();
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen}>Ajouter une oeuvre</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Ajouter une oeuvre</DialogTitle>
          <DialogContent>
            <DialogContentText>Tous les champs sont requis.</DialogContentText>
            <ArtPieceForm
              defaultArtpiece={this.props.artpiece}
              artists={this.props.artists}
              arttypes={this.props.arttypes}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Terminer</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
