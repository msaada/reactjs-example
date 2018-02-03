//@flow
import type { UserType } from "../types/types";

export default (id: string, props: UserType, timestamp: Date) => ({
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
