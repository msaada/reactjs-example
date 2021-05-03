import React from 'react';
import Divider from '@material-ui/core/Divider';

const styles = {
  divider: {
    marginBottom: '1em',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default function ProductTitle(props) {
  const { product, artistName } = props;
  if (product) {
    return (
      <div>
        <div className="canvasTitle" style={styles.centered}>
          {product.name}
        </div>
        <Divider style={styles.divider} />
        <div style={styles.centered}>
          {product.year !== '-1'
            ? `${artistName}, ${product.year}`
            : `${artistName}`}
        </div>
      </div>
    );
  }
  return <Divider style={styles.divider} />;
}
