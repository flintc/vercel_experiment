import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "@tanstack/react-query";

interface UseInfinteScrollProps<T> {
  hasNextPage: ReturnType<typeof useInfiniteQuery>["hasNextPage"];
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<T, unknown>>;
  useScrollOptions?: Parameters<typeof useScroll>[0];
  fetchNextPageOptions?: FetchNextPageOptions;
  enabled?: boolean;
}

export function useInfinteScroll<TInfiniteQueryData>({
  hasNextPage,
  fetchNextPage,
  useScrollOptions,
  fetchNextPageOptions,
  enabled = true,
}: UseInfinteScrollProps<TInfiniteQueryData>) {
  const [shouldFetchNextPage, setShouldFetchNextPage] = useState(false);
  const { scrollYProgress } = useScroll(useScrollOptions);
  useEffect(() => {
    if (enabled) {
      const onScrollY = (value: number) => {
        if (value >= 0.9 && hasNextPage) {
          if (!shouldFetchNextPage) {
            setShouldFetchNextPage(true);
          }
        } else {
          if (shouldFetchNextPage) {
            setShouldFetchNextPage(false);
          }
        }
      };
      scrollYProgress.onChange(onScrollY);
    }
  }, [scrollYProgress, hasNextPage, shouldFetchNextPage, enabled]);

  useEffect(() => {
    if (shouldFetchNextPage && enabled) {
      fetchNextPage(fetchNextPageOptions);
    }
  }, [shouldFetchNextPage, fetchNextPage, fetchNextPageOptions, enabled]);
}
