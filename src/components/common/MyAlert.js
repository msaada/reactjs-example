// @flow

import React from 'react';
import { Alert, Button } from 'react-bootstrap';

type Props = {
  visible: boolean,
  alertDissmiss: () => void,
  message: string,
};
type State = {};
export default function MyAlert(props: Props) {
  if (props.visible) {
    return (
      <Alert bsStyle="danger" onDismiss={props.alertDissmiss}>
        <h4>Une erreur est survenue</h4>
        <p>{props.message}</p>
        <p>
          <Button onClick={props.alertDissmiss}>J'ai compris</Button>
        </p>
      </Alert>
    );
  }
  return null;
}
