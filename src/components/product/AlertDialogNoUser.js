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

class AlertDialogNoUser extends React.Component {
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
              Vous devez vous identifier ou créer un compte pour ajouter cette
              oeuvre à votre panier.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Continuer à visiter
            </Button>
            <Button variant="raised" href={'/connexion'} color="primary">
              Connexion
            </Button>
            <Button variant="raised" href={'/creercompte'} color="primary">
              Créer un compte
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogNoUser;
