import React from 'react';
import { ListGroup, ListGroupItem, Card } from 'react-bootstrap';

import OrderUserInformation from './OrderUserInformation';
import OrderStatus from './OrderStatus';
import OrderAskingDate from './OrderAskingDate';
import OrderArtPieces from './OrderArtPieces';

export default function Order(props) {
  const { order, usersExtras, position } = props;
  const { userEmail, status, timestamp, userId, total, artpieces } = order;
  return (
    <Card key={position}>
      <Card.Heading>{userEmail}</Card.Heading>
      <Card.Body>
        <ListGroup>
          <OrderStatus status={status} />
          <OrderAskingDate timestamp={timestamp} />
          <OrderUserInformation userId={userId} usersExtras={usersExtras} />
          <OrderArtPieces artpieces={artpieces} />
          <ListGroupItem header="TOTAL">{total}</ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
