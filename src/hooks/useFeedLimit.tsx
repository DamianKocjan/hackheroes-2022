import { useMediaQuery } from "./useMediaQuery";

export function useFeedLimit() {
  const limit = useMediaQuery("sm", true) ? 5 : 7;

  return limit;
}
