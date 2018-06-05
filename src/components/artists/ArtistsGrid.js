//@flow

import GridList from 'material-ui/GridList';
import React from 'react';
import './Artist.css';
import ArtistsGridTyle from './ArtistsGridTyle';
import type { ArtistType } from '../../types/types';
type Props = {
  artists: ArtistType[],
};

export default (props: Props) => {
  const { artists } = props;
  return (
    artists.length && (
      <GridList cellHeight={450} className="gridList" cols={3}>
        {artists.map((artist: ArtistType, index: number) => {
          return ArtistsGridTyle(artist, index);
        })}
      </GridList>
    )
  );
};
