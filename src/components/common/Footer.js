import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../assets/Art-Gallery-Logo.jpg';

class Footer extends Component {
  styles() {
    return {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '5em',
        marginBottom: '2em',
        height: '5em',
      },
      nav_buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      logo: {
        height: '50%',
        maxWidth: '10em',
      },
      padding: {
        height: '2em',
      },
      nav_div: {
        flexGrow: '1',
      },
      button: {
        fontFamily: 'Din',
      },
    };
  }

  render() {
    return (
      <div style={this.styles().root}>
        <a href={'/'}>
          <Image
            src={logo}
            style={this.styles().logo}
            alt="Mega Dental concept store Art Gallery"
          />
        </a>
        <div style={this.styles().nav_div}>
          <div style={this.styles().padding} />
          <Divider />
          <div style={this.styles().nav_buttons}>
            <Button style={this.styles().button} href="/apropos">
              À propos
            </Button>
            <Button
              style={this.styles().button}
              href="https://www.megadental.fr/conditions-generales-de-vente-pour-les-professionnels-hors-professionnels-du-dentaire"
            >
              Conditions Générales de Ventes
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
