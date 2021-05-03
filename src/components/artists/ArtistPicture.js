import React from 'react';
import { Image } from 'react-bootstrap';
import './Artist.css';

export default (props) => {
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
