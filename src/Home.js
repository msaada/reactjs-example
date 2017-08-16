// @flow

import React, {Component} from 'react';

import logo from './assets/Art-Gallery-Logo.jpg';

import './css/App.css';

import './css/navbar.css';

import { BrowserRouter } from 'react-router-dom'

import { artists } from './arts'

import {GridList} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import {createReferences, readUserData} from './firebaseUtils.js'

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     artists: []
  //   };
  // };

  componentWillMount() {
    // createReferences(artists);
    // const dataArtists = readUserData();
    // this.setState({artists: dataArtists});
    // console.log(dataArtists);
    // console.log(this.state.artists);
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


  render() {
    return (
      <div className="Home">
        <h1 style={this.styles.centered}>
          HOME
        </h1>
        <RaisedButton label="Push to Firebase" primary={true} style={this.styles.button}/>

      </div>
    );
  }
}

export default Home;
