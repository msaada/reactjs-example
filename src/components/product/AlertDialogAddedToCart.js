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

export default function AlertDialogAddedToCart(props: Props) {
  return (
    <div>
      <Dialog
        open={props.open}
        transition={Transition}
        keepMounted
        onRequestClose={props.handleRequestClose}
      >
        <DialogTitle>Félicitation !</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cette oeuvre a bien été ajoutée à votre panier.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleRequestClose} color="primary">
            Continuer mes achats
          </Button>
          <Button variant="raised" href={'/panier'} color="primary">
            Finaliser mes achats
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
