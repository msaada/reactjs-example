//@flow
import React from "react";
import type { ArtPieceType } from "../types/types";

import "../css/App.css";

import { GridListTile, GridListTileBar } from "material-ui/GridList";
import { Image } from "react-bootstrap";

export const ArtPieceGrid = (
  artpiece: ArtPieceType,
  key: number,
  artistName: string
) => {
  const styles = {
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
      <GridListTileBar
        title={artistName ? `${artpiece.name}, ${artistName}` : artpiece.name}
        style={styles.titleBar}
      />

      <Image
        src={artpiece.imagesLinks ? artpiece.imagesLinks[0] : ""}
        alt={artistName ? `${artpiece.name}, ${artistName}` : artpiece.name}
        style={styles.root}
        onClick={e => (window.location.href = `/product/${artpiece.id}`)}
      />
    </GridListTile>
  );
};
