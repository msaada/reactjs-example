// @flow

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import ConditionalCircularProgress from '../../common/ConditionalCircularProgress';
import '../Admin.css';
import Paginator from '../Pagination';
import ArtTypesAdminList from './ArtTypesAdminList';
import type { ArtTypeType } from '../../../types/types';
type Props = {
  artTypes: ArtTypeType[],
};

type State = {
  arttypesActivePage: number,
};

export default class ArtTypesSection extends Component<Props, State> {
  state: State = {
    arttypesActivePage: 1,
  };
  handleSelectArtType = (index: number) => (event: SyntheticInputEvent<>) => {
    this.setState({
      arttypesActivePage: index,
    });
  };
  render() {
    const { artTypes } = this.props;
    const itemsPerPage = 5;
    return (
      <Paper elevation={3} className="paper">
        <Toolbar>
          <Typography variant="display3">Types d'oeuvres</Typography>
        </Toolbar>
        <ConditionalCircularProgress predicate={artTypes.length === 0} />
        <ArtTypesAdminList
          arttypes={artTypes.slice(
            itemsPerPage * (this.state.arttypesActivePage - 1),
            itemsPerPage * this.state.arttypesActivePage
          )}
        />
        <Paginator
          items={artTypes}
          itemsPerPage={itemsPerPage}
          className="centered"
          onSelect={this.handleSelectArtType}
          activePage={this.state.arttypesActivePage}
        />
      </Paper>
    );
  }
}
