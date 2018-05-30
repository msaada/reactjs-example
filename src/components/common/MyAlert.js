// @flow

import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

type Props = {
  alertDissmiss: () => void,
  message: string,
};
type State = {};
class MyAlert extends Component<Props, State> {
  render() {
    return (
      <Alert bsStyle="danger" onDismiss={this.props.alertDissmiss}>
        <h4>Une erreur est survenue</h4>
        <p>{this.props.message}</p>
        <p>
          <Button onClick={this.props.alertDissmiss}>J'ai compris</Button>
        </p>
      </Alert>
    );
  }
}

export default MyAlert;
