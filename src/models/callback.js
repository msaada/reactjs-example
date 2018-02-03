//@flow
import type { CallbackType } from "../types/types";

export default (id: string, props: CallbackType, timestamp: Date) => ({
  id: id,
  name: props.name,
  email: props.email,
  phoneNumber: props.phoneNumber,
  timestamp: timestamp
});
