//@flow
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

type Props = {
  open: boolean,
  handleRequestClose: () => void,
};

export default (props: Props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleRequestClose}
      >
        <DialogTitle>{'Merci !'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Un conseiller va vous recontacter dans les prochains jours.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="raised" href={'/'} color="primary">
            Retour à l'acceuil
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
