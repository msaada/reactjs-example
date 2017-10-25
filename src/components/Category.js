//@flow
import React from "react";

import type { CategoryType } from "../types/types";

import "../css/App.css";
import { GridTile } from "material-ui/GridList";

export const Category = (key: number, category: CategoryType) => {
  return (
    <GridTile key={key} title={category.name}>
      <img src={category.picture} alt={category.name} />
    </GridTile>
  );
};
