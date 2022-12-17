import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { discoverMovie } from ".";
import _ from "lodash";
import { DiscoverMovieParams } from "../../pages/api/tmdb/discoverMovie";
import { GETMoviePopular200Response } from "../../generated/openapi";

export const useDiscoverMovie = (params: DiscoverMovieParams) => {
  const query = useQuery(
    ["discoverMovie", params],
    async ({ queryKey }) => {
      const resp = await discoverMovie(params);
      return resp.data;
    },
    {
      enabled: !_.isEmpty(params),
      keepPreviousData: true,
    }
  );
  if (_.isEmpty(params)) {
    return { ...query, data: null };
  }
  return query;
};

export type DiscoverMovieData = GETMoviePopular200Response;

export const useDiscoverMovieInfinite = (params: DiscoverMovieParams) => {
  const result = useInfiniteQuery({
    queryKey: [
      "movies",
      "keyword",
      {
        includeAdult: false,
        withOriginalLanguage: "en",
        sortBy: "vote_count.desc",
        voteCountGte: 10,
        ...params,
      },
    ] as [string, string, DiscoverMovieParams],
    queryFn: async ({ queryKey, pageParam }) => {
      const [, , queryKeyParams] = queryKey;
      const resp = await discoverMovie({
        ...queryKeyParams,
        page: pageParam,
      });
      return resp.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.total_pages === lastPage.page ||
        lastPage.page === undefined
        ? null
        : lastPage.page + 1;
    },
    staleTime: 10000 * 60 * 1000,
    keepPreviousData: true,
    enabled: !_.isEmpty(params) && params?.id === undefined,
  });
  return result;
};
