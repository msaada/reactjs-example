// @flow
import React from 'react';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import OrderUserInformation from './OrderUserInformation';
import OrderStatus from './OrderStatus';
import OrderAskingDate from './OrderAskingDate';
import OrderArtPieces from './OrderArtPieces';

import type { FirebaseOrderType, UserType } from '../../../types/types';

type Props = {
  order: FirebaseOrderType,
  usersExtras: UserType[],
  position: number,
};

export default function Order(props: Props) {
  const { order, usersExtras, position } = props;
  const { userEmail, status, timestamp, userId, total, artpieces } = order;
  return (
    <Panel header={userEmail} footer={status} key={position}>
      <ListGroup>
        <OrderStatus status={status} />
        <OrderAskingDate timestamp={timestamp} />
        <OrderUserInformation userId={userId} usersExtras={usersExtras} />
        <OrderArtPieces artpieces={artpieces} />
        <ListGroupItem header="TOTAL">{total}</ListGroupItem>
      </ListGroup>
    </Panel>
  );
}
