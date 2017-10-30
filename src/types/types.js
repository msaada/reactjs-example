//@flow

export type ArtistType = {
  id: string,
  name: string,
  logo: string,
  picture: string,
  description: string,
  imagesLinks: Array<string>,
  typeOfArtPieces: string,
  artPiecesIds: Array<string>
};

export type CategoryType = {
  name: string,
  picture: any
};

export type ArtTypeType = {
  name: string
};

export type ArtPieceType = {
  id: string,
  galeryId: string,
  artistId: string,
  reference: string,
  name: string,
  typeOfArtPieces: string,
  relatedArtPiecesIds: Array<string>,
  description: string,
  buyPriceTaxFree: number,
  buyPriceTaxIncluded: number,
  sellPriceTaxFree: number,
  sellPriceTaxIncluded: number,
  catalogPage: number,
  dimensions: string,
  weight: number,
  year: string,
  imagesLinks: Array<string>
};
