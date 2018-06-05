// @flow
import React from 'react';
import { Image } from 'react-bootstrap';
import './Artist.css';
import type { ArtistType } from '../../types/types';

type Props = {
  artist: ?ArtistType,
};
export default (props: Props) => {
  const { artist } = props;
  if (artist) {
    return (
      <div className="artistPictureContainer">
        <Image src={artist.picture} className="artistPicture" />
      </div>
    );
  } else {
    return null;
  }
};
