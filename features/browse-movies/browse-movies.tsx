import { useQueryClient } from "@tanstack/react-query";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DiscoverMovieParams } from "../../pages/api/tmdb/discoverMovie";
import {
  useDiscoverMovie,
  useDiscoverMovieInfinite,
  DiscoverMovieData,
} from "../../shared/api/useDiscoverMovie";
import { useInfinteScroll } from "../../shared/useInfiniteScroll";
import { BrowseDecades } from "./browse-decades";

const useBrowseMovies = (state: DiscoverMovieParams) => {
  const [enabled, setEnabled] = useState(false);
  const result = useDiscoverMovieInfinite(state);
  const { hasNextPage, fetchNextPage } = result;
  useInfinteScroll<DiscoverMovieData>({ hasNextPage, fetchNextPage, enabled });
  return {
    query: result,
    loadMoreButton: {
      props: {
        onClick: () => {
          hasNextPage && fetchNextPage();
          if (!enabled) {
            setEnabled(true);
          }
        },
      },
      show: hasNextPage && !enabled,
    },
  };
};

export const BrowseMovies = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { query, loadMoreButton } = useBrowseMovies(router.query);
  return query.status === "success" ? (
    <>
      <ul className="space-y-2 mt-4 m-auto max-w-lg">
        {query.data.pages
          .map((page) => page.results)
          .flat()
          .map((result) => {
            if (result?.id === undefined) {
              return null;
            }
            queryClient.setQueryData(["movie", result.id], result);

            return (
              <li
                // layout
                // layoutId={`movie_${result.id}`}
                className="p-10 bg-pink-800 rounded relative overflow-hidden"
                key={result?.id}
              >
                <button
                  className="bg-red-800 absolute inset-0"
                  onClick={() => {
                    router.push(
                      {
                        query: { id: result?.id },
                        pathname: "/movie/[id]",
                      },
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  {result?.title}
                </button>
                {/* <Link
                  
                  href={{
                    pathname: "/movie",
                    query: {
                      id: result?.id,
                    },
                  }}
                  scroll={false}
                  // replace={true}
                  shallow={true}
                >
                  {result?.title}
                </Link> */}
              </li>
            );
          })}
      </ul>
      {loadMoreButton.show && (
        <button {...loadMoreButton.props}>laod more</button>
      )}
    </>
  ) : (
    <BrowseDecades />
  );
};
