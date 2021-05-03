import GridList from '@material-ui/core/GridList';
import React from 'react';
import './Artist.css';
import ArtistsGridTyle from './ArtistsGridTyle';


export default (props) => {
  const { artists } = props;
  if (artists.length !== 0) {
    return (
      <GridList cellHeight={450} className="gridList" cols={3}>
        {artists.map((artist, index) => {
          return ArtistsGridTyle(artist, index);
        })}
      </GridList>
    );
  }
  return null;
};
