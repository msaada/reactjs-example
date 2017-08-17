// @flow

import React, {Component} from 'react';

import logo from './assets/Art-Gallery-Logo.jpg';

import './css/App.css';

import './css/navbar.css';

import Artist from './Artist';

import {BrowserRouter} from 'react-router-dom';
import {MenuExample} from './Menu';

import { artists } from './arts'

import {GridList} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import Stage from 'react-stage';

import {createReferences, readUserData} from './firebaseUtils.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
    };
  };

  componentWillMount() {
    const callback = (dataArtists) => {
      this.setState({artists: dataArtists})
    };
    const dataArtists = readUserData(callback);
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
      },
      slides: {
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        padding: '100px',
        textAlign: 'center'
      }
    }
  };

  settings {} {
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  speed: 500
};

  listArtists() {
    return this.state.artists.map((artist, index) => {
      return <Artist artist={artist} key={index}/>;
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="Mega Dental concept store Art Gallery"/>
        </div>
        <h2 style={this.styles().centered}>Welcome to Mega Dental Concept store Art Gallery</h2>
        <Divider/>
        <MenuExample items={['Home', 'Services', 'About', 'Contact us']}/>
        <Stage >
                  <div style={this.styles().slides}><span>Slide 1</span></div>
                  <div style={this.styles().slides}><span>Slide 2</span></div>
                  <div style={this.styles().slides}><span>Slide 3</span></div>
                  <div style={this.styles().slides}><span>Slide 4</span></div>
                  <div style={this.styles().slides}><span>Slide 5</span></div>
        </Stage>

        <h1 style={this.styles().centered}>
          BEST ARTISTS
        </h1>
        { this.state.artists.length &&
        <GridList cellHeight={250} style={this.styles().gridList} cols={4} padding={10}>
          {this.listArtists()}
        </GridList>
        }
        <RaisedButton label="Push to Firebase" primary={true} style={this.styles().button} onClick={this}/>

      </div>
    );
  }
}

export default App;
