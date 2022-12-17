import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { searchMulti } from ".";
import _ from "lodash";
import { GETSearchMulti200Response } from "../../generated/openapi";

export const useSearchMulti = (params: {
  search: string;
  page: number | undefined;
}) => {
  const query = useQuery(
    ["searchMulti", params],
    async ({ queryKey }) => {
      const [, params] = queryKey;
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
  search: string;
  page: number | undefined;
}) => {
  const query = useInfiniteQuery(
    ["searchMulti", params],
    async ({ queryKey, pageParam }) => {
      const [, params] = queryKey as [string, object];
      const resp = await searchMulti({ ...params, page: pageParam });
      return resp.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.total_pages === lastPage.page ||
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
