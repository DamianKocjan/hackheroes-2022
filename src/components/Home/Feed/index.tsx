import React from "react";
import { useFeedLimit } from "../../../hooks/useFeedLimit";
import { trpc } from "../../../utils/trpc";

export const Feed: React.FC = () => {
  const limit = useFeedLimit();
  const { data } = trpc.feed.getAll.useInfiniteQuery(
    {
      limit,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      {data &&
        data.pages.map((page) =>
          page.items.map((item) => JSON.stringify(item))
        )}
    </div>
  );
};
