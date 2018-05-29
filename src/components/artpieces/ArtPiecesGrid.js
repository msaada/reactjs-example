// @flow

import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import React from 'react';
import { Image } from 'react-bootstrap';
import './ArtPiecesGrid.css';
import { ArtPiecesGridTyle } from './ArtPiecesGridTyle';
import type { ArtPieceType } from '../../types/types';

type Props = {
  artPieces: ArtPieceType[],
  artistName: string,
  gridSize?: {
    cellHeight: number,
    cols: number,
  },
  hasSeeMoreTyle?: boolean,
};
// TODO: remove when className will overide material ui theme
const tileBarStyle = {
  background: 'rgba(0, 0, 0, 0.15)',
  height: '2.5em',
};

type SeeMoreTyle = (
  key: number,
  title: string,
  destination: string
) => GridListTile;
const seeMoreTyle: SeeMoreTyle = (key, title, destination) => (
  <GridListTile key={key}>
    <GridListTileBar title={title} style={tileBarStyle} />

    <Image
      src={require('../../assets/more.jpg')}
      alt={title}
      className={'seeMoreImage'}
      onClick={e => (window.location.href = destination)}
    />
  </GridListTile>
);

export default (props: Props) => {
  const { artPieces, artistName, gridSize, hasSeeMoreTyle } = props;
  return (
    <GridList
      cellHeight={gridSize ? gridSize.cellHeight : 250}
      cols={gridSize ? gridSize.cols : 4}
      className={'gridList'}
    >
      {artPieces.map((artPiece: ArtPieceType, index: number) =>
        ArtPiecesGridTyle(artPiece, index, artistName)
      )}
      {hasSeeMoreTyle && artPieces.length ? (
        seeMoreTyle(
          artPieces.length,
          'Voir toutes les nouveautés...',
          '/nouveautes'
        )
      ) : (
        <div />
      )}
    </GridList>
  );
};
