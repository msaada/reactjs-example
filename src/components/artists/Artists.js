// @flow
import Divider from 'material-ui/Divider';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import '../../css/App.css';
import { getArtists } from '../../javascript/firebaseUtils';
import Footer from '../common/Footer';
import Header from '../common/Header';
import ConditionalCircularProgress from '../common/ConditionalCircularProgress';
import ArtistsGrid from './ArtistsGrid';
import type { ArtistType } from '../../types/types';

type Props = {};
type State = {
  artists: ArtistType[],
};
class Artists extends Component<Props, State> {
  state: State = {
    artists: [],
  };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);

    const callbackArtists = (dataArtists: ArtistType[]) => {
      this.setState({
        artists: dataArtists,
      });
    };
    getArtists(callbackArtists);
  }

  styles() {
    return {
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      margin: {
        marginBottom: '1em',
      },
    };
  }

  render = () => {
    return (
      <div>
        <Header />

        <div className="body">
          <h1 style={this.styles().centered}> Artistes </h1>
          <Divider style={this.styles().margin} />
          <ConditionalCircularProgress
            predicate={this.state.artists.length === 0}
          />
          <ArtistsGrid artists={this.state.artists} />
        </div>

        <Footer />
      </div>
    );
  };
}

export default Artists;
