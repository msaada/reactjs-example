import React from 'react';
import Button from '@material-ui/core/Button';
import { ListGroupItem } from 'react-bootstrap';

const CompletedStatus = (props) => {
  if (props.status) {
    return <p> Traitée </p>;
  }
  return <p> Non Traitée </p>;
};

export default function OrderStatus(props) {
  return (
    <ListGroupItem header="Status">
      <CompletedStatus status={props.status} />
      <Button variant="raised"> Terminer commande</Button>
    </ListGroupItem>
  );
}
