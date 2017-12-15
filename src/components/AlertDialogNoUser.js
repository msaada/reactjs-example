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

class AlertDialogNoUser extends React.Component {
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
              Vous devez vous identifier ou créer un compte pour ajouter cette
              oeuvre à votre panier.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Continuer à visiter
            </Button>
            <Button raised href={"/connexion"} color="primary">
              Connexion
            </Button>
            <Button raised href={"/creercompte"} color="primary">
              Créer un compte
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogNoUser;