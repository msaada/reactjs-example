import React from 'react';
import { Alert, Button } from 'react-bootstrap';


export default function MyAlert(props) {
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
