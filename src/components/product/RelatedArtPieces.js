// @flow
import React from 'react';

import Divider from '@material-ui/core/Divider';
import ArtPiecesGrid from '../artpieces/ArtPiecesGrid';
import ConditionalCircularProgress from '../common/ConditionalCircularProgress';

import type { ArtPieceType, ArtistType } from '../../types/types';
type Props = {
  artPieces: ArtPieceType[],
  artist: ?ArtistType,
  currentProductId: string,
};

const styles = {
  divider: {
    marginBottom: '1em',
  },
};

export default function RelatedArtPieces(props: Props) {
  const { artPieces, artist, currentProductId } = props;
  const relatedArtPieces = artPieces.filter(
    artpiece => artpiece.id !== currentProductId
  );
  if (relatedArtPieces.length !== 0) {
    return (
      <div>
        <h1>Oeuvres associées à l'artiste</h1>
        <Divider style={styles.divider} />
        <ConditionalCircularProgress predicate={artPieces.length === 0} />
        <ArtPiecesGrid
          artPieces={relatedArtPieces}
          artistName={artist ? artist.name : ''}
        />
        <br />
      </div>
    );
  }
  return null;
}
