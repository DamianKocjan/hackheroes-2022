import React, { useCallback } from "react";
import { useCommentLimit } from "../../../../../hooks/useCommentLimit";
import { trpc } from "../../../../../utils/trpc";
import { ErrorAlert } from "../../../../shared/ErrorAlert";
import { LoadingSpinner } from "../../../../shared/LoadingSpinner";
import { Comment } from "./Comment";
import { CommentInput } from "./Input";

interface CommentsProps {
  model: "post" | "ofert" | "event" | "poll";
  modelId: string;
}

export const CommentSection: React.FC<CommentsProps> = ({ model, modelId }) => {
  const limit = useCommentLimit();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = trpc.comment.getAll.useInfiniteQuery(
    {
      model,
      modelId,
      limit,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    }
  );

  const refetchComments = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return (
    <div className="px-4 py-4 sm:px-6">
      <CommentInput model={model} modelId={modelId} refetch={refetchComments} />
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
        <div className="flex flex-col gap-4">
          {data.pages.map((page) =>
            page.items.map((item) => <Comment key={item.id} {...item} />)
          )}

          {hasNextPage && !isFetchingNextPage && (
            <button
              className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={async () => await fetchNextPage()}
            >
              Load more
            </button>
          )}

          {isFetchingNextPage && (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
