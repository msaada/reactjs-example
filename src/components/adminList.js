//@flow
import React, { Component } from "react";

import _ from "lodash";

import Avatar from "material-ui/Avatar";

import List, { ListItem, ListItemText } from "material-ui/List";

import { updateArtist } from "../javascript/firebaseUtils";
import type { ArtistType, ArtPieceType, ArtTypeType } from "../types/types";
import AddArtistDialog from "./AddArtistDialog";

type Props = {
  artists?: Array<ArtistType>,
  artpieces?: Array<ArtPieceType>,
  arttypes?: Array<ArtTypeType>
};

export default class AdminList extends Component<Props> {
  state: {
    chosenArtist: ?ArtistType
  } = {
    chosenArtist: null
  };
  render() {
    return (
      <List>
        {this.props.artists &&
          this.props.artists.length &&
          _.map(this.props.artists, (artist: ArtistType, pos: number) => (
            <ListItem
              key={pos}
              dense
              button
              onClick={e =>
                this.setState({
                  chosenArtist: artist
                })
              }
            >
              <Avatar
                alt={artist.name}
                src={artist.logo ? artist.logo : artist.picture}
              />
              <ListItemText primary={artist.name} />
            </ListItem>
          ))}
        {this.props.artpieces &&
          this.props.artpieces.length &&
          _.map(this.props.artpieces, (artpiece: ArtPieceType, pos: number) => (
            <ListItem key={pos} dense button>
              <Avatar
                alt={artpiece.name}
                src={
                  artpiece.imagesLinks && artpiece.imagesLinks.length
                    ? artpiece.imagesLinks[0]
                    : ""
                }
              />
              <ListItemText primary={artpiece.name} />
            </ListItem>
          ))}
        {this.props.arttypes &&
          this.props.arttypes.length &&
          _.map(this.props.arttypes, (arttype: ArtTypeType, pos: number) => (
            <ListItem key={pos} dense button>
              <Avatar alt={arttype.name} src={arttype.name} />
              <ListItemText primary={arttype.name} />
            </ListItem>
          ))}
        <ListItem>
          <AddArtistDialog artist={this.state.chosenArtist} />
        </ListItem>
      </List>
    );
  }
}
