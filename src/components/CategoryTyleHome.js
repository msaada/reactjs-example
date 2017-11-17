//@flow
import React from "react";

import type { CategoryType } from "../types/types";

import { categories } from "../datas/categories";

import "../css/App.css";
import { GridListTile, GridListTileBar } from "material-ui/GridList";
import { browserHistory } from "react-router";
import { Image } from "react-bootstrap";

const findCategoryId = (category: CategoryType) => {
  const keys = Object.keys(categories);
  for (let i = 0; i < keys.length; i++) {
    if (categories[keys[i]].id === category.id) {
      return categories[keys[i]].url;
    }
  }
  return "";
};

export const CategoryTyleHome = (key: number, category: CategoryType) => {
  const style = {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    titleBar: {
      background: "rgba(0,0,0,0.15)",
      height: "2.5em",
      textAlign: "center"
    }
  };

  return (
    <GridListTile key={key}>
      <GridListTileBar title={category.name} style={style.titleBar} />

      <Image
        src={categories.peinture.image}
        onClick={e => (window.location.href = `/${findCategoryId(category)}`)}
        alt={category.name}
      />
    </GridListTile>
  );
};
