// @flow
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import React, { Component } from 'react';
import '../../css/App.css';
import { getArtTypes } from '../../javascript/firebaseUtils';
import Footer from '../common/Footer';
import Header from '../common/Header';
import ConditionalCircularProgress from '../common/ConditionalCircularProgress';
import { CategoryTyle } from './CategoryTyle';

import type { ArtTypeType } from '../../types/types';

type Props = {};

type State = {
  arttypes: ArtTypeType[],
};
class Categories extends Component<Props, State> {
  state: State = {
    arttypes: [],
  };

  componentWillMount() {
    const callbackArttype = dataArttypes => {
      this.setState({
        arttypes: dataArttypes,
      });
    };
    getArtTypes(callbackArttype);
  }

  styles() {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      categoryName: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        marginTop: '12em',
      },
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      relative: {
        position: 'relative',
        width: '100%',
        height: '35em',
      },
      absolute: {
        position: 'absolute',
      },
      image: {
        height: '30em',
        width: '100%',
        position: 'absolute',
      },
      gridList: {
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
      },
      margin: {
        marginBottom: '1em',
      },
      name: {
        fontSize: '5em',
        textTransform: 'uppercase',
      },
    };
  }

  render = () => {
    return (
      <div>
        <Header />
        <div className="body">
          <h1 style={this.styles().centered}> Catégories </h1>
          <Divider style={this.styles().margin} />
          <ConditionalCircularProgress
            predicate={this.state.arttypes.length === 0}
          />
          <GridList cellHeight={300} style={this.styles().gridList} cols={3}>
            {this.state.arttypes.map((arttype: ArtTypeType, index: number) => {
              return CategoryTyle(index, arttype);
            })}
          </GridList>
        </div>

        <Footer />
      </div>
    );
  };
}

export default Categories;
