export default (id, props, timestamp) => ({
  id: id,
  itemCount: props.itemCount,
  items: props.items,
  active: props.active,
  timestamp: timestamp
});
