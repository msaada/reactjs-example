// @flow

import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";
class MyAlert extends Component {
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
