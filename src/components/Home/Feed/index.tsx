import React from "react";
import { useFeedLimit } from "../../../hooks/useFeedLimit";
import { trpc } from "../../../utils/trpc";
import { EmptyState } from "../../shared/EmptyState";
import { ErrorAlert } from "../../shared/ErrorAlert";
import { InfiniteLoader } from "../../shared/InfiniteLoader";
import { LoadingSpinner } from "../../shared/LoadingSpinner";
import { Activity, ActivityProps } from "./Activity";
import { ActivityOfert } from "./Activity/Ofert";

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
    <div className="mx-auto flex max-w-xl flex-col gap-2">
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
              <Activity key={item.id} {...(item as ActivityProps)} />
            ))
          )}
          <InfiniteLoader
            callback={() => fetchNextPage()}
            isFetching={isFetching}
            hasNextPage={hasNextPage ?? false}
          />
        </>
      )}
      <ActivityOfert />
      <ActivityOfert />
    </div>
  );
};
