//@flow
import React from "react";
import type { ArtistType } from "../types/types";

import "../css/App.css";

import { GridListTile, GridListTileBar } from "material-ui/GridList";

import { Image } from "react-bootstrap";

export const ArtistHomeGrid = (artist: ArtistType, key: number) => {
  const style = {
    root: {
      height: "80%",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      justifyContent: "center"
    },
    titleBar: {
      background: "rgba(0,0,0,0.15)",
      height: "2.5em",
      textAlign: "center"
    }
  };
  return (
    <GridListTile key={key}>
      <GridListTileBar title={artist.name} style={style.titleBar} />
      <Image
        src={artist.logo.length ? artist.logo : artist.picture}
        alt={artist.description}
        style={style.root}
        onClick={e => (window.location.href = `/artist/${artist.id}`)}
      />
    </GridListTile>
  );
};
