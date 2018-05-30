//@flow
import Button from 'material-ui/Button';
import React, { Component } from 'react';
import { FieldGroup } from '../common/FieldGroup';

type Props = {
  name: string,
  nameChange: (e: SyntheticInputEvent<>) => void,
  email: string,
  emailChange: (e: SyntheticInputEvent<>) => void,
  phoneNumber: string,
  phoneNumberChange: (e: SyntheticInputEvent<>) => void,
  handleCallback: () => Promise<void>,
};
type State = {};

export class CallbackForm extends Component<Props, State> {
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
        <Button raised onClick={this.props.handleCallback}>
          Demander un rappel
        </Button>
      </form>
    );
  }
}
