import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import Paginator from '.././Pagination';
import '../Admin.css';
import ArtistAdminList from './ArtistAdminList';

export default class ArtistsSection extends Component {
  state = {
    artistsActivePage: 1,
  };

  handleSelectArtist = (index) => (event) => {
    this.setState({
      artistsActivePage: index,
    });
  };

  render() {
    const { artists } = this.props;
    const itemsPerPage = 5;
    return (
      <Paper elevation={3} className="paper">
        <Toolbar>
          <Typography variant="display3" gutterBottom>
            Artistes
          </Typography>
        </Toolbar>
        <ConditionalCircularProgress predicate={artists.length === 0} />
        <ArtistAdminList
          artists={artists.slice(
            itemsPerPage * (this.state.artistsActivePage - 1),
            itemsPerPage * this.state.artistsActivePage
          )}
        />
        <Paginator
          items={artists}
          itemsPerPage={itemsPerPage}
          className="centered"
          onSelect={this.handleSelectArtist}
          activePage={this.state.artistsActivePage}
        />
      </Paper>
    );
  }
}
