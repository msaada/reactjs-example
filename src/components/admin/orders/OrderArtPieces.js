import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

export default function OrderArtPieces(props) {
  const { artpieces } = props;
  if (artpieces.length) {
    return (
      <div>
        {artpieces.map((artpiece, pos) => (
          <ListGroupItem header={artpiece.name} key={pos}>
            {'REF: ' + artpiece.reference}
            <br />
            {'PRIX: ' + artpiece.sellPriceTaxIncluded}
          </ListGroupItem>
        ))}
      </div>
    );
  }
  return null;
}
