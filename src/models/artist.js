//@flow
import type { ArtistType } from "../types/types";

export default (id: string, props: ArtistType, timestamp: Date) => ({
  id: id,
  description: props.description,
  name: props.name,
  logo: props.logo,
  picture: props.picture,
  typeOfArtPieces: props.typeOfArtPieces,
  featured: props.featured,
  timestamp: timestamp
});
