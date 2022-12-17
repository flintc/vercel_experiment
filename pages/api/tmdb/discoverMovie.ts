import { NextApiRequest, NextApiResponse } from "next";

import tmdb from "../../../tmdb-client";

export type DiscoverMovieResponse = ReturnType<typeof tmdb.gETDiscoverMovie>;

export type DiscoverMovieParams = {
  sortBy?:
    | ""
    | "popularity.asc"
    | "popularity.desc"
    | "release_date.asc"
    | "release_date.desc"
    | "revenue.asc"
    | "revenue.desc"
    | "primary_release_date.asc"
    | "primary_release_date.desc"
    | "original_title.asc"
    | "original_title.desc"
    | "vote_average.asc"
    | "vote_average.desc"
    | "vote_count.asc"
    | "vote_count.desc";
  certificationCountry?: string;
  certification?: string;
  certificationLte?: string;
  certificationGte?: string;
  includeAdult?: boolean;
  includeVideo?: boolean;
  language?: string;
  page?: number;
  primaryReleaseYear?: number;
  primaryReleaseDateGte?: Date;
  primaryReleaseDateLte?: Date;
  releaseDateGte?: string;
  releaseDateLte?: string;
  withReleaseType?: number;
  year?: number;
  voteCountGte?: number;
  voteCountLte?: number;
  voteAverageGte?: number;
  voteAverageLte?: number;
  withCast?: string;
  withCrew?: string;
  withPeople?: string;
  withCompanies?: string;
  withGenres?: string;
  withoutGenres?: string;
  withKeywords?: string;
  withoutKeywords?: string;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  withOriginalLanguage?: string;
  withWatchProviders?: string;
  watchRegion?: string;
  withWatchMonetizationTypes?: "flatrate" | "free" | "ads" | "rent" | "buy";
  withoutCompanies?: string;
};

export default async function discoverMovieHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = 1;
  console.log("searchMultiHandler", req.query);
  // const query = req.query as DiscoverMovieParams;
  const query = req.query;

  // const resp = await tmdb.gETDiscoverMovie(
  //   "popularity.desc",
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   false,
  //   false,
  //   undefined,
  //   page,
  //   undefined,
  //   query?.["primaryReleaseDateGte"],
  //   query?.["primaryReleaseDateGte"],
  //   undefined,
  //   undefined,
  //   query?.["withReleaseType"],
  //   undefined
  // );

  const resp = await tmdb.gETDiscoverTv({
    ...query,

    // primaryReleaseDateGte: query.primaryReleaseDateGte
    //   ? new Date(query.primaryReleaseDateGte as string)
    //   : undefined,
    // primaryReleaseDateLte: query.primaryReleaseDateLte
    //   ? new Date(query.primaryReleaseDateLte as string)
    //   : undefined,
  });
  // const resp = await tmdb.gETDiscoverMovie(
  //   query?.sortBy || "popularity.desc",
  //   query.certificationCountry,
  //   query.certification,
  //   query.certificationLte,
  //   query.certificationGte,
  //   query.includeAdult,
  //   query.includeVideo,
  //   query.language,
  //   query.page,
  //   query.primaryReleaseYear,
  //   query.primaryReleaseDateGte,
  //   query.primaryReleaseDateLte,
  //   query.releaseDateGte,
  //   query.releaseDateLte,
  //   query.withReleaseType,
  //   query.year,
  //   query.voteCountGte,
  //   query.voteCountLte,
  //   query.voteAverageGte,
  //   query.voteAverageLte,
  //   query.withCast,
  //   query.withCrew,
  //   query.withPeople,
  //   query.withCompanies,
  //   query.withGenres,
  //   query.withoutGenres,
  //   query.withKeywords,
  //   query.withoutKeywords,
  //   query.withRuntimeGte,
  //   query.withRuntimeLte,
  //   query.withOriginalLanguage,
  //   query.withWatchProviders,
  //   query.watchRegion,
  //   query.withWatchMonetizationTypes,
  //   query.withoutCompanies
  // );

  // console.log("searchMultiHandler", resp);

  res.status(200).json(resp);
  // res.send(resp);
}
