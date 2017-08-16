import React, { Component } from 'react';

import './css/App.css'
import {GridTile} from 'material-ui/GridList';



class Artist extends Component {
  render() {
    return (
      <GridTile key={this.props.artist.id} title={this.props.artist.name}>
        <img src={this.props.artist.picture} alt={this.props.artist.name}/>
      </GridTile>
    );
  }
}

export default Artist;
