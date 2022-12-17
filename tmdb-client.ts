import { DefaultApi as DefaultApiOther } from "./generated/openapi";
import { DefaultApi, Configuration } from "./generated/openapi-try2";

// can only be used server side to protect api key
export const tmdbOther = new DefaultApiOther({
  apiKey: process.env.TMDB_API_KEY,
  isJsonMime(mime) {
    return true;
  },
});

const config = new Configuration({ apiKey: process.env.TMDB_API_KEY });
const tmdb = new DefaultApi(config);

export default tmdb;
