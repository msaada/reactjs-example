// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import { ListGroupItem } from 'react-bootstrap';

type Props = {
  status: boolean,
};

const CompletedStatus = (props: Props) => {
  if (props.status) {
    return <p> Traitée </p>;
  }
  return <p> Non Traitée </p>;
};

export default function OrderStatus(props: Props) {
  return (
    <ListGroupItem header="Status">
      <CompletedStatus status={props.status} />
      <Button raised> Terminer commande</Button>
    </ListGroupItem>
  );
}
