import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Component } from 'react';
import AddArtTypeDialog from './AddArtTypeDialog';

export default class AdminList extends Component {
  state = {
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
        {this.props.arttypes.map((arttype, pos) => (
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
