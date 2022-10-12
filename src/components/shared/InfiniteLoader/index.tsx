import React, { useCallback, useEffect, useRef } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

interface InfiniteLoaderProps {
  callback: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}

export const InfiniteLoader: React.FC<InfiniteLoaderProps> = ({
  callback,
  isFetching,
  hasNextPage,
}) => {
  const loader = useRef(null);

  const loadMore: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];

      if (target?.isIntersecting && hasNextPage) {
        !isFetching && callback();
      }
    },
    [hasNextPage, isFetching, callback]
  );

  useEffect(() => {
    const options = {
      root: null, // window by default
      rootMargin: "0px",
      threshold: 0.25,
    };

    // Create observer
    const observer = new IntersectionObserver(loadMore, options);

    // observer the loader
    if (loader && loader.current) {
      observer.observe(loader.current);
    }

    // clean up on willUnMount
    return () => observer.unobserve(loader.current!);
  }, [loader, loadMore]);

  return (
    <div ref={loader} className="flex w-full items-center justify-center">
      {isFetching && <LoadingSpinner />}
    </div>
  );
};
