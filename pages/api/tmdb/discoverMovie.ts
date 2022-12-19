import { NextApiRequest, NextApiResponse } from "next";
import { GETDiscoverMovieRequest } from "../../../generated/openapi-tmdb";

import tmdb from "../../../tmdb-client";

export type DiscoverMovieResponse = ReturnType<typeof tmdb.gETDiscoverMovie>;

export type DiscoverMovieParams = GETDiscoverMovieRequest;

export default async function discoverMovieHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("searchMultiHandler", req.query);
  const query = req.query;

  const resp = await tmdb.gETDiscoverMovie({
    ...query,
    primaryReleaseDateGte: query.primaryReleaseDateGte
      ? new Date(query.primaryReleaseDateGte as string)
      : undefined,
    primaryReleaseDateLte: query.primaryReleaseDateLte
      ? new Date(query.primaryReleaseDateLte as string)
      : undefined,
  });

  res.status(200).json(resp);
}
