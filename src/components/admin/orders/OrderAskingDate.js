import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

export default function OrderAskingDate(props) {
  const { timestamp } = props;
  return (
    <ListGroupItem header="Date de la demande">
      {new Date(timestamp).toLocaleDateString()}
    </ListGroupItem>
  );
}
