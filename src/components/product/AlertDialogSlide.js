//@flow
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import React from 'react';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

type Props = {
  open: boolean,
  handleRequestClose: () => void,
};

export const AlertDialogSlide = (props: Props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        transition={Transition}
        keepMounted
        onRequestClose={props.handleRequestClose}
      >
        <DialogTitle>{'Félicitation !'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cette oeuvre a bien été ajoutée à votre panier.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleRequestClose} color="primary">
            Continuer mes achats
          </Button>
          <Button raised href={'/panier'} color="primary">
            Finaliser mes achats
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
