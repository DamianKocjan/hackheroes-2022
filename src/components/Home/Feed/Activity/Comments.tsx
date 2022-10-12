import React from "react";
import { useFeedLimit } from "../../../../hooks/useFeedLimit";
import { trpc } from "../../../../utils/trpc";
import { ErrorAlert } from "../../../shared/ErrorAlert";
import { InfiniteLoader } from "../../../shared/InfiniteLoader";
import { LoadingSpinner } from "../../../shared/LoadingSpinner";
import { Comment } from "./Comment";

interface CommentsProps {
  postId: string;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const limit = useFeedLimit();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetching,
  } = trpc.comment.getAll.useInfiniteQuery(
    {
      postId,
      limit,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <ErrorAlert
          title="Something went wrong!"
          message={error?.message ?? String(error)}
        />
      ) : data.pages?.[0]?.items.length !== 0 ? (
        <>
          {data.pages.map((page) =>
            page.items.map((item) => <Comment key={item.id} {...item} />)
          )}
          <InfiniteLoader
            callback={() => fetchNextPage()}
            isFetching={isFetching}
            hasNextPage={hasNextPage ?? false}
          />
        </>
      ) : null}
    </div>
  );
};
