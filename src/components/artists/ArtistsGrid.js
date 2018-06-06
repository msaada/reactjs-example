//@flow

import GridList from '@material-ui/core/GridList';
import React from 'react';
import './Artist.css';
import ArtistsGridTyle from './ArtistsGridTyle';
import type { ArtistType } from '../../types/types';
type Props = {
  artists: ArtistType[],
};

export default (props: Props) => {
  const { artists } = props;
  if (artists.length !== 0) {
    return (
      <GridList cellHeight={450} className="gridList" cols={3}>
        {artists.map((artist: ArtistType, index: number) => {
          return ArtistsGridTyle(artist, index);
        })}
      </GridList>
    );
  }
  return null;
};
