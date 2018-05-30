//@flow
import ButtonBase from 'material-ui/ButtonBase';
import { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import React from 'react';
import '../../css/App.css';
import { categories } from '../../datas/categories';

import type { CategoryType } from '../../types/types';

const findCategoryId = (category: CategoryType) => {
  const keys = Object.keys(categories);
  for (let i = 0; i < keys.length; i++) {
    if (categories[keys[i]].id === category.id) {
      return categories[keys[i]].url;
    }
  }
  return '';
};

export const CategoryTyle = (key: number, category: CategoryType) => {
  const style = {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleBar: {
      background: 'rgba(0,0,0,0.15)',
      height: '2.5em',
      textAlign: 'center',
    },
    buttonBase: {
      root: {
        marginTop: '2em',
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
      },
      image: {
        position: 'relative',
        height: '100%',
        width: '100%',
        '&:hover': {
          zIndex: 1,
        },
        '&:hover $imageBackdrop': {
          opacity: 0.15,
        },
        '&:hover $imageMarked': {
          opacity: 0,
        },
        '&:hover $imageTitle': {
          border: '4px solid currentColor',
        },
      },
      imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
      },
      imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundImage: `url(${category.picture ? category.picture : ''})`,
      },
      imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: '#000000',
        opacity: 0.3,
        transition: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      imageTitle: {
        position: 'relative',
        padding: '1em',
        fontSize: '2em',
        textAlign: 'center',
      },
      imageMarked: {
        height: 3,
        width: '2em',
        background: '#FFFFFF',
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 1em)',
        transition: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  };

  return (
    <GridListTile key={key}>
      <ButtonBase
        disableRipple
        href={`/${findCategoryId(category)}`}
        key={key}
        style={style.buttonBase.image}
      >
        <div style={style.buttonBase.imageSrc} />
        <div style={style.buttonBase.imageBackdrop} />
        <div style={style.buttonBase.imageButton}>
          <Typography
            component="h2"
            color="inherit"
            style={style.buttonBase.imageTitle}
          >
            {category.name}
            <div style={style.buttonBase.imageMarked} />
          </Typography>
        </div>
      </ButtonBase>
    </GridListTile>
  );
};
