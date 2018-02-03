//@flow
import type { OrderType } from "../types/types";

export default (id: string, props: OrderType, timestamp: Date) => ({
  id: id,
  artpieces: props.artpieces,
  userId: props.userId,
  userEmail: props.userEmail,
  total: props.total,
  status: props.status,
  timestamp: timestamp
});
