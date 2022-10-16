import React from "react";
import { useFeedLimit } from "../../../hooks/useFeedLimit";
import { trpc } from "../../../utils/trpc";
import { EmptyState } from "../../shared/EmptyState";
import { ErrorAlert } from "../../shared/ErrorAlert";
import { InfiniteLoader } from "../../shared/InfiniteLoader";
import { LoadingSpinner } from "../../shared/LoadingSpinner";
import { Activity, ActivityProps } from "./Activity";
import { CreateActivity } from "./Activity/Create";

export const Feed: React.FC = () => {
  const limit = useFeedLimit();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetching,
  } = trpc.feed.getAll.useInfiniteQuery(
    {
      limit,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <CreateActivity />

      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <ErrorAlert
          title="Something went wrong!"
          message={error?.message ?? String(error)}
        />
      ) : data.pages?.[0]?.items.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="Seems like there are no posts yet."
        />
      ) : (
        <>
          {data.pages.map((page) =>
            page.items.map((item) => (
              <Activity
                key={item.id}
                {...(item as ActivityProps)}
                type={item.type as any}
              />
            ))
          )}
          <InfiniteLoader
            callback={() => fetchNextPage()}
            isFetching={isFetching}
            hasNextPage={hasNextPage ?? false}
          />
        </>
      )}
    </div>
  );
};
