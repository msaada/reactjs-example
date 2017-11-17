//@flow
import React from "react";

import _ from "lodash";

import Avatar from "material-ui/Avatar";

import List, { ListItem, ListItemText } from "material-ui/List";

import type { ArtistType, ArtPieceType, ArtTypeType } from "../types/types";

export default (props: {
  artists?: Array<ArtistType>,
  artpieces?: Array<ArtPieceType>,
  arttypes?: Array<ArtTypeType>
}) => {
  return (
    <List>
      {props.artists &&
        props.artists.length &&
        _.map(props.artists, (artist: ArtistType, pos: number) => (
          <ListItem key={pos} dense button>
            <Avatar
              alt={artist.name}
              src={artist.logo ? artist.logo : artist.picture}
            />
            <ListItemText
              primary={artist.name}
              secondary={JSON.stringify(artist)}
            />
          </ListItem>
        ))}
      {props.artpieces &&
        props.artpieces.length &&
        _.map(props.artpieces, (artpiece: ArtPieceType, pos: number) => (
          <ListItem key={pos} dense button>
            <Avatar
              alt={artpiece.name}
              src={artpiece.imagesLinks ? artpiece.imagesLinks[0] : ""}
            />
            <ListItemText
              primary={artpiece.name}
              secondary={JSON.stringify(artpiece)}
            />
          </ListItem>
        ))}
      {props.arttypes &&
        props.arttypes.length &&
        _.map(props.arttypes, (arttype: ArtTypeType, pos: number) => (
          <ListItem key={pos} dense button>
            <Avatar alt={arttype.name} src={arttype.name} />
            <ListItemText
              primary={arttype.name}
              secondary={JSON.stringify(arttype)}
            />
          </ListItem>
        ))}
    </List>
  );
};
