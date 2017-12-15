//@flow
import React from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Slide from "material-ui/transitions/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogReserved extends React.Component {
  state: { open: boolean } = { open: false };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          transition={Transition}
          keepMounted
          onRequestClose={this.props.handleRequestClose}
        >
          <DialogTitle>{"Attention !"}</DialogTitle>
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
