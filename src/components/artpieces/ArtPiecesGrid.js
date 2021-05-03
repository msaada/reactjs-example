import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTile from '@material-ui/core/GridListTile';

import React from 'react';
import { Image } from 'react-bootstrap';
import './ArtPiecesGrid.css';
import { ArtPiecesGridTyle } from './ArtPiecesGridTyle';
import moreLogo from '../../assets/more.jpg';

// TODO: remove when className will overide material ui theme
const tileBarStyle = {
  background: 'rgba(0, 0, 0, 0.15)',
  height: '2.5em',
};

const seeMoreTyle = (key, title, destination) => (
  <GridListTile key={key}>
    <GridListTileBar title={title} style={tileBarStyle} />

    <Image
      src={moreLogo}
      alt={title}
      className="seeMoreImage"
      onClick={e => (window.location.href = destination)}
    />
  </GridListTile>
);

export default (props) => {
  const { artPieces, artistName, gridSize, hasSeeMoreTyle } = props;
  return (
    <GridList
      cellHeight={gridSize ? gridSize.cellHeight : 250}
      cols={gridSize ? gridSize.cols : 4}
      className="gridList"
    >
      {artPieces.map((artPiece, index) =>
        ArtPiecesGridTyle(artPiece, index, artistName)
      )}
      {hasSeeMoreTyle && artPieces.length
        ? seeMoreTyle(
            artPieces.length,
            'Voir toutes les nouveautés...',
            '/nouveautes'
          )
        : null}
    </GridList>
  );
};
