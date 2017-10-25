//@flow

export type ArtistType = {
  firstName: string,
  lastName: string,
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
  imagesLinks: Array<string>
};
