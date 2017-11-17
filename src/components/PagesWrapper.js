// @flow
import React from "react";
import Category from "./Category";
import { categories } from "../datas/categories";

export const Paintings = () => {
  return <Category category={categories.peinture} />;
};

export const Engraving = () => {
  return <Category category={categories.gravure} />;
};

export const Sculpture = () => {
  return <Category category={categories.sculpture} />;
};

export const Furniture = () => {
  return <Category category={categories.meuble} />;
};

export const Photography = () => {
  return <Category category={categories.photographie} />;
};

export const Digigraphy = () => {
  return <Category category={categories.digigraphie} />;
};

export const AcrylicAerosol = () => {
  return <Category category={categories.acrylique} />;
};

export const OilOnCanvas = () => {
  return <Category category={categories.huile_sur_toile} />;
};

export const LinoEngraving = () => {
  return <Category category={categories.linogravure} />;
};

export const MontagePhoto = () => {
  return <Category category={categories.montage_photographique} />;
};

export const CardboardPainting = () => {
  return <Category category={categories.peinture_carton} />;
};

export const OilPainting = () => {
  return <Category category={categories.peinture_a_l_huile} />;
};
export const Photomontage = () => {
  return <Category category={categories.photomontage} />;
};

export const SculpturePainting = () => {
  return <Category category={categories.sculpture_peinture} />;
};

export const SculptureResin = () => {
  return <Category category={categories.sculpture_resine} />;
};

export const Serigraphy = () => {
  return <Category category={categories.serigraphie} />;
};

export const AcrylicCanvas = () => {
  return <Category category={categories.tableau_acrylique} />;
};

export const DigitalTechnique = () => {
  return <Category category={categories.technique_numerique} />;
};

export const Canvas = () => {
  return <Category category={categories.toile} />;
};

export const AngleArtPiece = () => {
  return <Category category={categories.oeuvre_dangle} />;
};

export const CanvasArtPiece = () => {
  return <Category category={categories.oeuvre_sur_toile} />;
};

export const FurnituresAccessories = () => {
  return <Category category={categories.mobilier_accessoire} />;
};
