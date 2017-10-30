//@flow
import type { ArtPieceType } from "../types/types";

export default (id: string, props: ArtPieceType, timestamp: string) => ({
  id: id,
  galeryId: props.galeryId,
  artistId: props.artistId,
  reference: props.reference,
  name: props.name,
  typeOfArtPieces: props.typeOfArtPieces,
  relatedArtPiecesIds: props.relatedArtPiecesIds,
  description: props.description,
  buyPriceTaxFree: props.buyPriceTaxFree,
  buyPriceTaxIncluded: props.buyPriceTaxIncluded,
  sellPriceTaxFree: props.sellPriceTaxFree,
  sellPriceTaxIncluded: props.sellPriceTaxIncluded,
  catalogPage: props.catalogPage,
  dimensions: props.dimensions,
  weight: props.weight,
  imagesLinks: props.imagesLinks,
  year: props.year,
  timestamp: timestamp
});
