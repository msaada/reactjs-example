import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Image, Card } from 'react-bootstrap';

import ConditionalCircularProgress from '../common/ConditionalCircularProgress';

const formatDescription = (description) => {
  return `${description.slice(0, Math.min(description.length, 1000))}...`;
};

const styles = {
  root: {
    marginTop: '2em',
  },
  divider: {
    marginBottom: '1em',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    height: '20em',
    textAlign: 'center',
    width: '100%',
  },
  button: {
    fontFamily: 'Din',
  },
  artistArea: {
    root: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logoLayout: {
      order: '1',
      maxWidth: '30rem',
      margin: 'auto',
    },
    descriptionLayout: {
      root: {
        order: '2',
        flex: '2',
        margin: '1em',
        flexShrink: '0',
      },
      text: {
        textAlign: 'justify',
        minWidth: '50em',
      },
    },
    logo: {
      width: 'auto',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
};

export default function ArtistDescription(props) {
  const { artist } = props;
  if (artist) {
    return (
      <div style={styles.root}>
        <h1>Un mot sur l'artiste...</h1>
        <Divider style={styles.divider} />
        <ConditionalCircularProgress predicate={artist === null} />
        <div style={styles.artistArea.root}>
          <div style={styles.artistArea.logoLayout}>
            <Card style={styles.paper}>
              <Image
                src={artist.logo.length ? artist.logo : artist.picture}
                style={styles.artistArea.logo}
              />
            </Card>
          </div>
          <div style={styles.artistArea.descriptionLayout.root}>
            <p style={styles.artistArea.descriptionLayout.text}>
              {formatDescription(artist.description)}
            </p>

            <Button href={`/artist/${artist.id}`} style={styles.button}>
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Un mot sur l'artiste...</h1>
      <Divider style={styles.divider} />
    </div>
  );
}
