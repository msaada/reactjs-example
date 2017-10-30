//@flow
import React, { Component } from "react";

import _ from "lodash";

import Avatar from "material-ui/Avatar";
import ActionGrade from "material-ui/svg-icons/action/grade";
import { List, ListItem, makeSelectable } from "material-ui/List";
import { pinkA200 } from "material-ui/styles/colors";
import PropTypes from "prop-types";

import type { ArtistType, ArtPieceType, ArtTypeType } from "../types/types";

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    state: {
      selectedIndex: number
    };
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

export default (props: {
  artists?: Array<ArtistType>,
  artpieces?: Array<ArtPieceType>,
  arttypes?: Array<ArtTypeType>
}) => {
  return (
    <SelectableList defaultValue={3}>
      {props.artists &&
        props.artists.length &&
        _.map(props.artists, (artist: ArtistType, pos: number) => (
          <ListItem
            key={pos}
            value={pos}
            primaryText={artist.name}
            leftIcon={<ActionGrade color={pinkA200} />}
            rightAvatar={
              <Avatar src={artist.logo ? artist.logo : artist.picture} />
            }
          />
        ))}
      {props.artpieces &&
        props.artpieces.length &&
        _.map(props.artpieces, (artpiece: ArtPieceType, pos: number) => (
          <ListItem
            key={pos}
            value={pos}
            primaryText={artpiece.name}
            leftIcon={<ActionGrade color={pinkA200} />}
            rightAvatar={<Avatar src={artpiece.imagesLinks[0]} />}
          />
        ))}
      {props.arttypes &&
        props.arttypes.length &&
        _.map(props.arttypes, (arttype: ArtTypeType, pos: number) => (
          <ListItem
            key={pos}
            value={pos}
            primaryText={arttype.name}
            leftIcon={<ActionGrade color={pinkA200} />}
          />
        ))}
    </SelectableList>
  );
};
