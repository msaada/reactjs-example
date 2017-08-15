// @flow

import React, {Component} from 'react';

import logo from './assets/Art-Gallery-Logo.jpg';

import './css/App.css';

import './css/navbar.css';

import Artist from './Artist';

import {BrowserRouter} from 'react-router-dom';
import {MenuExample} from './Menu';


// import { artists } from './arts'

import {GridList} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import {createReferences, readUserData} from './firebaseUtils.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    };
  };

  componentDidMount() {
    const dataArtists = readUserData();
    const renderedArtists = this.listArtists(dataArtists);
    // console.log(renderedArtists);
    this.setState({
      artists: renderedArtists
    });
  };

  styles() {
    return {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      },
      gridList: {
        overflowY: 'auto'
      },
      centered: {
        display: 'flex',
        justifyContent: 'center'
      },
      button: {
        margin: 12
      }
    }
  };

  listArtists(artists) {
    const rendered = artists.map((artist) => {
      const art = <Artist artist={artist}/>;
      console.log(art);
      return art;
    });
    // console.log(rendered);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="Mega Dental concept store Art Gallery"/>
        </div>
        <h2 style={this.styles().centered}>Welcome to Mega Dental Concept store Art Gallery</h2>
        <Divider/>
        <MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] } />

        <h1 style={this.styles().centered}>
          BEST ARTISTS
        </h1>
        <GridList cellHeight={250} style={this.styles().gridList} cols={4} padding={10}>
          {this.state.artists}
        </GridList>

        <RaisedButton label="Push to Firebase" primary={true} style={this.styles().button}/>

      </div>
    );
  }
}

export default App;
