import React from "react";
import { trpc } from "../../../utils/trpc";

export const Feed: React.FC = () => {
  const { data } = trpc.feed.getAll.useInfiniteQuery(
    {
      limit: 10,
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
