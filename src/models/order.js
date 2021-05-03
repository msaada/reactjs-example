export default (id, props, timestamp) => ({
  id: id,
  artpieces: props.artpieces,
  userId: props.userId,
  userEmail: props.userEmail,
  total: props.total,
  status: props.status,
  timestamp: timestamp
});
