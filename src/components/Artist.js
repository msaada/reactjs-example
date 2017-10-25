//@flow
import React from "react";
import type { ArtistType } from "../types/types";

import "../css/App.css";

import { GridTile } from "material-ui/GridList";

export const Artist = (artist: ArtistType, key: number) => {
  return (
    <GridTile key={key} title={artist.firstName}>
      <img src={artist.picture} alt={artist.description} />
    </GridTile>
  );
};
