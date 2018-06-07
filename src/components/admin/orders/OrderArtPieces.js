// @flow
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import type { ArtPieceType } from '../../../types/types';

type Props = {
  artpieces: ArtPieceType[],
};

export default function OrderArtPieces(props: Props) {
  const { artpieces } = props;
  if (artpieces.length) {
    return (
      <div>
        {artpieces.map((artpiece: ArtPieceType, pos: number) => (
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
