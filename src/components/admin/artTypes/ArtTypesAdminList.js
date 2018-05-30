//@flow
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import React, { Component } from 'react';
import AddArtTypeDialog from './AddArtTypeDialog';

import type { ArtTypeType } from '../../../types/types';

type Props = {
  arttypes: ArtTypeType[],
};

type State = {
  chosenArtType: ?ArtTypeType,
};

export default class AdminList extends Component<Props, State> {
  state: State = {
    chosenArtType: null,
  };

  clearArtType = () => {
    this.setState({
      chosenArtType: null,
    });
  };
  render() {
    return (
      <List>
        {this.props.arttypes.map((arttype: ArtTypeType, pos: number) => (
          <ListItem key={pos} dense button>
            <Avatar alt={arttype.name} src={arttype.name} />
            <ListItemText primary={arttype.name} />
          </ListItem>
        ))}
        <ListItem>
          <AddArtTypeDialog
            arttype={this.state.chosenArtType}
            resetFields={this.clearArtType}
          />
        </ListItem>
      </List>
    );
  }
}
