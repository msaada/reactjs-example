//@flow
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import React from 'react';
import { Image } from 'react-bootstrap';
import '../../css/App.css';
import type { ArtPieceType } from '../../types/types';

export const ArtPiecesGridTyle = (
  artpiece: ArtPieceType,
  key: number,
  artistName: string
) => {
  const styles = {
    root: {
      height: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      justifyContent: 'center',
    },
    titleBar: {
      background: 'rgba(0,0,0,0.15)',
      height: '2.5em',
      textAlign: 'center',
    },
    reserved: {
      position: 'absolute',
      height: '100%',
    },
    image: {
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      justifyContent: 'center',
      opacity: artpiece.reserved ? '0.2' : '1',
    },
  };
  return (
    <GridListTile key={key}>
      <GridListTileBar
        title={artistName ? `${artpiece.name}, ${artistName}` : artpiece.name}
        style={styles.titleBar}
      />
      <div style={styles.root}>
        {artpiece.reserved && (
          <Image
            src={require('../../assets/reserved.png')}
            alt={artistName ? `${artpiece.name}, ${artistName}` : artpiece.name}
            style={styles.reserved}
            onClick={e => (window.location.href = `/product/${artpiece.id}`)}
          />
        )}
        <Image
          src={artpiece.imagesLinks ? artpiece.imagesLinks[0] : ''}
          alt={artistName ? `${artpiece.name}, ${artistName}` : artpiece.name}
          style={styles.image}
          onClick={e => (window.location.href = `/product/${artpiece.id}`)}
        />
      </div>
    </GridListTile>
  );
};
