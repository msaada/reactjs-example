// @flow
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import type { UserType } from '../../../types/types';
type Props = {
  userId: string,
  usersExtras: UserType[],
};

export default function OrderUserInformation(props: Props) {
  const userExtra = props.usersExtras.find(user => user.id === props.userId);

  return (
    <ListGroupItem header="Informations utilisateur">
      {userExtra && (
        <div>
          <div>Nom: {userExtra.name}</div>
          <div>Téléphone: {userExtra.phoneNumber}</div>
          <div>Addresse: {userExtra.address}</div>
          <div>Code Postal: {userExtra.postalCode}</div>
          <div>Code client: {userExtra.clientCode}</div>
        </div>
      )}
    </ListGroupItem>
  );
}
