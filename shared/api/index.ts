import {
  GETMoviePopular200Response,
  GETSearchMulti200Response,
} from "../../generated/openapi-tmdb";
import axios from "axios";
import { DiscoverMovieParams } from "../../pages/api/tmdb/discoverMovie";

// can be used server or client side
export const searchMulti = async (params: {
  search: string;
  page?: number;
}) => {
  const out = await axios.request<GETSearchMulti200Response>({
    url: "/api/tmdb/searchMulti",
    params,
  });
  return out;
};

export const discoverMovie = async (params: DiscoverMovieParams) => {
  const out = await axios.request<GETMoviePopular200Response>({
    url: "/api/tmdb/discoverMovie",
    params,
  });
  console.log("discoverMovie out", out);
  return out;
};

// export const getUser = async (
//   client: ReturnType<typeof useApolloClient>,
//   options
// ) => {
//   return client.query({
//     query: documents.GET_USER,
//     ...options,
//   });
// };

// const useGetUser = () => {
//   const client = useApolloClient();
//   const queryFn = async () => {
//     const out = await client.query({
//       query: documents.GET_USER,
//       // options: {},
//       // fetchPolicy: ''
//       variables: {
//         userId: "google-oauth2|103274414933344601378",
//         // userId: 100,
//         // foo: "bar",
//       },
//     });
//   };
// };
