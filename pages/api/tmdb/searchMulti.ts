import { NextApiRequest, NextApiResponse } from "next";

import tmdb, { tmdbOther } from "../../../tmdb-client";

export type SearchMultiResponse = ReturnType<typeof tmdb.gETSearchMulti>;

export default async function searchMultiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resp = await tmdb.gETSearchMulti({
    query: req.query.search,
    page: req.query?.page || 1,
  });
  console.warn("....", req.query, resp);
  res.status(200).json(resp);
  // res.status(200).json({ results: [], page: 1 });
  // tmdbOther.gETSearchMulti({})
  // const resp = await tmdbOther.gETSearchMulti({
  //   params: {
  //     query: req.query.search,
  //     page: req.query?.page || 1,
  //   },
  // });

  // res.status(200).json(resp.data);
}
