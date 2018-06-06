// @flow
import React from 'react';
import Divider from 'material-ui/Divider';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import ConditionalCircularProgress from '../common/ConditionalCircularProgress';

import type { ArtPieceType } from '../../types/types';
type Props = {
  product: ?ArtPieceType,
};

const styles = {
  divider: {
    marginBottom: '1em',
  },
};

export default function ProductDetails(props: Props) {
  const { product } = props;
  if (product) {
    return (
      <div>
        <h1>Détails</h1>
        <Divider style={styles.divider} />
        <ListGroup>
          <ListGroupItem header="Description">
            {product.description}
          </ListGroupItem>
          <ListGroupItem header="Dimensions">
            {product.dimensions !== '' && product.dimensions}
          </ListGroupItem>
          <ListGroupItem header="Nombre d'exemplaires">
            {product.quantity !== -1 && product.quantity}
          </ListGroupItem>
          <ListGroupItem header="Année">
            {product.year !== '-1' && product.year}
          </ListGroupItem>
          <ListGroupItem header="Référence">{product.reference}</ListGroupItem>
        </ListGroup>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Détails</h1>
        <Divider style={styles.divider} />
        <ConditionalCircularProgress predicate={true} />
      </div>
    );
  }
}
