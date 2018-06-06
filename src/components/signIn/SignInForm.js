//@flow
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { FieldGroup } from '../common/FieldGroup';

import type { UserType } from '../../types/types';

type Props = {
  name: string,
  nameChange: (e: SyntheticInputEvent<>) => void,
  email: string,
  emailChange: (e: SyntheticInputEvent<>) => void,
  password: string,
  passwordChange: (e: SyntheticInputEvent<>) => void,
  address: string,
  addressChange: (e: SyntheticInputEvent<>) => void,
  postalCode: string,
  postalCodeChange: (e: SyntheticInputEvent<>) => void,
  city: string,
  cityChange: (e: SyntheticInputEvent<>) => void,
  phoneNumber: string,
  phoneNumberChange: (e: SyntheticInputEvent<>) => void,
  clientCode: string,
  clientCodeChange: (e: SyntheticInputEvent<>) => void,
  signIn: (userInfos: UserType) => Promise<void>,
};
type State = {};
export class SignInForm extends Component<Props, State> {
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
          id="password"
          label="Mot de passe*"
          type="password"
          value={this.props.password}
          onChange={this.props.passwordChange}
        />
        <FieldGroup
          id="address"
          label="Adresse*"
          type="text"
          placeholder="Ex: Avenue Winston-Churchill"
          value={this.props.address}
          onChange={this.props.addressChange}
        />
        <FieldGroup
          id="postalCode"
          label="Code Postal*"
          placeholder="Ex: 75008"
          type="text"
          value={this.props.postalCode}
          onChange={this.props.postalCodeChange}
        />
        <FieldGroup
          id="city"
          label="Ville*"
          type="text"
          placeholder="Ex: Paris"
          value={this.props.city}
          onChange={this.props.cityChange}
        />
        <FieldGroup
          id="phoneNumber"
          label="Téléphone*"
          type="number"
          placeholder="Ex: 0612345678"
          value={this.props.phoneNumber}
          onChange={this.props.phoneNumberChange}
        />
        <FieldGroup
          id="clientCode"
          label="Code client"
          type="text"
          value={this.props.clientCode}
          onChange={this.props.clientCodeChange}
        />
        <Button variant="raised" onClick={this.props.signIn}>
          Créer le compte
        </Button>
      </form>
    );
  }
}
