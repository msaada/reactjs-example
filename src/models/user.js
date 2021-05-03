export default (id, props, timestamp) => ({
  id: id,
  name: props.name,
  address: props.address,
  postalCode: props.postalCode,
  city: props.city,
  phoneNumber: props.phoneNumber,
  clientCode: props.clientCode,
  isAdmin: false,
  timestamp: timestamp
});
