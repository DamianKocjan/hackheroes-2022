import { useMediaQuery } from "./useMediaQuery";

export function useCommentLimit() {
  const limit = useMediaQuery("sm", true) ? 3 : 5;

  return limit;
}
