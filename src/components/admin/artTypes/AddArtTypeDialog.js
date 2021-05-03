import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';
import ArtTypeForm from './ArtTypeForm';

export default class AddArtTypeDialog extends Component {
  state = {
    open: false,
  };
  constructor(props) {
    super(props);
    this.setState({
      open: this.props.arttype ? true : false,
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
    if (nextProps.arttype) {
      this.handleOpen();
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen}>Ajouter un type d'oeuvre</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Ajouter un type d'oeuvre</DialogTitle>
          <DialogContent>
            <DialogContentText>Tous les champs sont requis.</DialogContentText>
            <ArtTypeForm defaultArtType={this.props.arttype} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Terminer</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
