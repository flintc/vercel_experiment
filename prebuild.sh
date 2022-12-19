#/bin/bash

docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i /local/tmdb_spec.json \
    -g typescript-fetch \
    -o /local/generated/openapi-tmdb

cp ./generated/openapi-tmdb/models/__edited__GETSearchMulti200Response.ts ./generated/openapi-tmdb/models/GETSearchMulti200Response.ts
cp ./generated/openapi-tmdb/models/__edited__GETTvTvIdSeasonSeasonNumber200Response.ts ./generated/openapi-tmdb/models/GETTvTvIdSeasonSeasonNumber200Response.ts