//@flow

import sculptures from "../assets/sculptures.png";
import paintings from "../assets/paintings.jpg";

import type { CategoryType } from "../types/types";

export const categories: Array<CategoryType> = [
  {
    name: "Sculpture",
    picture: sculptures
  },
  {
    name: "Peinture",
    picture: paintings
  }
];
