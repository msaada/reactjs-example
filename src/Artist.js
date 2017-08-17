import React, { Component } from 'react';

import './css/App.css'
import {GridTile} from 'material-ui/GridList';



class Artist extends Component {
  render() {
    return (
      <GridTile key={this.props.artist.id} title={this.props.artist.firstName}>
        <img src={this.props.artist.profilePicture} alt={this.props.artist.firstName}/>
      </GridTile>
    );
  }
}

export default Artist;
