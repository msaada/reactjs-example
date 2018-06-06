// @flow
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

type Props = {
  timestamp: string,
};

export default function OrderAskingDate(props: Props) {
  const { timestamp } = props;
  return (
    <ListGroupItem header="Date de la demande">
      {new Date(timestamp).toLocaleDateString()}
    </ListGroupItem>
  );
}
