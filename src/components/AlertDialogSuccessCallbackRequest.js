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

class AlertDialogSuccessCallbackRequest extends React.Component {
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
          <DialogTitle>{"Merci !"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Un conseiller va vous recontacter dans les prochains jours.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button raised href={"/"} color="primary">
              Retour à l'acceuil
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSuccessCallbackRequest;
