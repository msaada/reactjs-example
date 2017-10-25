//@flow
import type { ArtistType } from "../types/types";

export default (id: string, props: ArtistType, timestamp: string) => ({
  id: id,
  description: props.description,
  firstName: props.firstName,
  lastName: props.lastName,
  picture: props.picture,
  typeOfArtPieces: props.typeOfArtPieces,
  artPiecesIds: props.artPiecesIds,
  timestamp: timestamp
});
