import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { FieldGroup } from '../common/FieldGroup';


export class CallbackForm extends Component {
  render() {
    return (
      <form>
        <FieldGroup
          id="name"
          type="name"
          label="Nom*"
          placeholder="Entez votre nom"
          value={this.props.name}
          onChange={this.props.nameChange}
        />
        <FieldGroup
          id="email"
          type="email"
          label="Email*"
          placeholder="Entrez votre email"
          value={this.props.email}
          onChange={this.props.emailChange}
        />
        <FieldGroup
          id="phoneNumber"
          label="Téléphone*"
          type="number"
          placeholder="Ex: 0612345678"
          value={this.props.phoneNumber}
          onChange={this.props.phoneNumberChange}
        />
        <Button variant="raised" onClick={this.props.handleCallback}>
          Demander un rappel
        </Button>
      </form>
    );
  }
}
