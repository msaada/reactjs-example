//@flow
import type { CartType } from "../types/types";

export default (id: string, props: CartType, timestamp: Date) => ({
  id: id,
  itemCount: props.itemCount,
  items: props.items,
  active: props.active,
  timestamp: timestamp
});
