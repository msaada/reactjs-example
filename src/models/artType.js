//@flow
import type { ArtTypeType } from "../types/types";

export default (id: string, props: ArtTypeType, timestamp) => ({
  id: id,
  name: props.name,
  timestamp: timestamp
});
