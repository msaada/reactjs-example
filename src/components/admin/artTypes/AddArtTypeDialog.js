//@flow
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';
import ArtTypeForm from './ArtTypeForm';

import type { ArtTypeType } from '../../../types/types';

type State = {
  open: boolean,
};

type Props = {
  arttype: ?ArtTypeType,
  resetFields: () => void,
};

export default class AddArtTypeDialog extends Component<Props, State> {
  state: State = {
    open: false,
  };
  constructor(props: Props) {
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
  componentWillReceiveProps(nextProps: { arttype: ?ArtTypeType }) {
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
