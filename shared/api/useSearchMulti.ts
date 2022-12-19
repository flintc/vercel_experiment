import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { searchMulti } from ".";
import _ from "lodash";
import { GETSearchMulti200Response } from "../../generated/openapi-tmdb";

export const useSearchMulti = (params: { search: string; page?: number }) => {
  const query = useQuery(
    ["searchMulti", params],
    async () => {
      const resp = await searchMulti(params);
      return resp.data;
    },
    {
      enabled: params.search !== undefined && params?.search !== "",
      keepPreviousData: params.search !== undefined && params?.search !== "",
      // select: data => {
      //   return data
      // }
    }
  );

  return query;
};

export type SearchMultiData = GETSearchMulti200Response;

export const useSearchMultiInfinite = (params: {
  search?: string;
  page?: number;
}) => {
  const query = useInfiniteQuery(
    ["searchMulti", params],
    async ({ queryKey, pageParam }) => {
      const [, params] = queryKey as [string, object];
      const args = {
        ...params,
        page: pageParam,
      } as { search: string; page?: number };
      const resp = await searchMulti(args);
      return resp.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.totalPages === lastPage.page ||
          lastPage.page === undefined
          ? null
          : lastPage.page + 1;
      },
      staleTime: 10000 * 60 * 1000,
      enabled: params.search !== undefined && params?.search !== "",
      keepPreviousData: params.search !== undefined && params?.search !== "",
      select: (data) => {
        return {
          // ...data,
          pages: data.pages,
          pageParams: data.pageParams,
          // results: data.pages.map((x) => x.results).flat(),
        };
      },
    }
  );
  // console.log("????", query?.data.);
  return query;
};
