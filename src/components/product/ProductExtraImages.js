// @flow
import React from 'react';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import type { ArtPieceType } from '../../types/types';

type TriggerLightBox = (index: number) => void;

type Props = {
  product: ?ArtPieceType,
  triggerLightBox: TriggerLightBox,
};

const styles = {
  divider: {
    marginBottom: '1em',
  },
  gridList: {
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
};

const listOtherPictures = (
  product: ArtPieceType,
  triggerLightBox: TriggerLightBox
) => {
  const pictures = product.imagesLinks;
  return pictures.map((picture, index) => (
    <GridListTile key={index}>
      <img
        src={picture}
        onClick={e => triggerLightBox(index)}
        alt={product.name}
      />
    </GridListTile>
  ));
};

export default function ProductTitle(props: Props) {
  const { product, triggerLightBox } = props;
  if (product && product.imagesLinks.length > 1) {
    return (
      <div>
        <h1>L'oeuvre sous tous ses angles</h1>
        <Divider style={styles.divider} />
        <GridList cellHeight={300} style={styles.gridList} cols={4}>
          {listOtherPictures(product, triggerLightBox)}
        </GridList>
      </div>
    );
  }
  return null;
}
