import { NextApiRequest, NextApiResponse } from "next";

import tmdb from "../../../tmdb-client";

export type SearchMultiResponse = ReturnType<typeof tmdb.gETSearchMulti>;

export default async function searchMultiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.query.search === "string") {
    const resp = await tmdb.gETSearchMulti({
      query: req.query.search,
      page:
        req.query?.page && typeof req.query.page === "string"
          ? parseInt(req.query.page)
          : 1,
    });
    console.warn("....", req.query, resp);
    res.status(200).json(resp);
  }
}
