//@flow

export type UserType = {
  id: string,
  name: string,
  address?: string,
  postalCode?: string,
  city?: string,
  phoneNumber: string,
  clientCode?: string
};

export type ArtistType = {
  id: string,
  name: string,
  logo: string,
  picture: string,
  description: string,
  typeOfArtPieces: string,
  featured: boolean
};

export type CategoryType = {
  id: string,
  name: string,
  picture: string
};

export type ArtTypeType = {
  id: string,
  name: string,
  picture: string
};

export type CartType = {
  id: string,
  itemCount: number,
  items: Array<ArtPieceType>,
  active: boolean
};

export type ArtPieceType = {
  id: string,
  galeryId: string,
  artistId: string,
  reference: string,
  name: string,
  typeOfArtPieces: string,
  description: string,
  buyPriceTaxFree: number,
  buyPriceTaxIncluded: number,
  sellPriceTaxFree: number,
  sellPriceTaxIncluded: number,
  catalogPage: number,
  dimensions: string,
  weight: number,
  year: string,
  quantity: number,
  imagesLinks: Array<string>,
  featured: boolean,
  reserved: boolean
};

export type OrderType = {
  artpieces: Array<ArtPieceType>,
  userId: string,
  userEmail: string,
  total: number,
  status: boolean
};

export type OrderRow = {
  id: number,
  email: string,
  artpieces: Array<ArtPieceType>,
  status: boolean,
  total: number
};

export type FirebaseUser = {
  uid: string,
  email: string
};

export type CallbackType = {
  id?: string,
  name: string,
  phoneNumber: string,
  email: string
};

export type File = {
  name: string
};
