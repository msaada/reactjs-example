// @flow
import React from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { Image, Panel } from 'react-bootstrap';

import ConditionalCircularProgress from '../common/ConditionalCircularProgress';
import type { ArtistType } from '../../types/types';

type Props = {
  artist: ?ArtistType,
};

const formatDescription = (description: string): string => {
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

export default function ArtistDescription(props: Props) {
  const { artist } = props;
  if (artist) {
    return (
      <div style={styles.root}>
        <h1>Un mot sur l'artiste...</h1>
        <Divider style={styles.divider} />
        <ConditionalCircularProgress predicate={artist === null} />
        <div style={styles.artistArea.root}>
          <div style={styles.artistArea.logoLayout}>
            <Panel style={styles.paper}>
              <Image
                src={artist.logo.length ? artist.logo : artist.picture}
                style={styles.artistArea.logo}
              />
            </Panel>
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
