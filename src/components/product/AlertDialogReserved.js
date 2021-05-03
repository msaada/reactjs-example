import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import React from 'react';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogReserved extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleRequestClose}
        >
          <DialogTitle>{'Attention !'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cette oeuvre est déjà reservée, vous ne pouvez pas l'ajouter au
              panier.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Compris
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogReserved;
