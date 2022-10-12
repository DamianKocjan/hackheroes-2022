import { useMediaQuery } from "./useMediaQuery";

export function useFeedLimit() {
  const limit = useMediaQuery("sm", true) ? 10 : 20;

  return limit;
}
