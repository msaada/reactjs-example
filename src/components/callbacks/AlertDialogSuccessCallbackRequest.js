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

export default (props: Props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        transition={Transition}
        keepMounted
        onRequestClose={props.handleRequestClose}
      >
        <DialogTitle>{'Merci !'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Un conseiller va vous recontacter dans les prochains jours.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button raised href={'/'} color="primary">
            Retour à l'acceuil
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
