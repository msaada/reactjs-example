export default (id, props, timestamp) => ({
  id: id,
  description: props.description,
  name: props.name,
  logo: props.logo,
  picture: props.picture,
  typeOfArtPieces: props.typeOfArtPieces,
  featured: props.featured,
  timestamp: timestamp
});
