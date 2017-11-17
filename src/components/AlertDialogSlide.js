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

class AlertDialogSlide extends React.Component {
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
          <DialogTitle>{"Félicitation !"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cette oeuvre a bien été ajoutée à votre panier.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Continuer mes achats
            </Button>
            <Button raised href={"/panier"} color="primary">
              Finaliser mes achats
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
