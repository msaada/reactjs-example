//@flow
import Button from '@material-ui/core/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import React from 'react';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

type Props = {
  open: boolean,
  handleRequestClose: () => void,
};

type State = {};

class AlertDialogReserved extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          transition={Transition}
          keepMounted
          onRequestClose={this.props.handleRequestClose}
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
