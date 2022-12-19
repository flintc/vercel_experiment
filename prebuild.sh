#/bin/bash



response=$(curl -X POST -H "Content-Type: application/json" -d '{"openAPIUrl":"https://raw.githubusercontent.com/flintc/vercel_experiment/main/tmdb_spec.json"}' http://api.openapi-generator.tech/api/gen/clients/typescript-fetch)

link=$(echo $response | sed -E 's/.*"link":"([^"]+)".*/\1/')

curl $link -o file.zip
unzip file.zip

mv typescript-fetch-client openapi-tmdb

cp ./generated/openapi-tmdb/models/__edited__GETSearchMulti200Response.ts ./openapi-tmdb/models/GETSearchMulti200Response.ts
cp ./generated/openapi-tmdb/models/__edited__GETTvTvIdSeasonSeasonNumber200Response.ts ./openapi-tmdb/models/GETTvTvIdSeasonSeasonNumber200Response.ts
rm -rf generated/openapi-tmdb/
mv openapi-tmdb generated/
rm file.zip


# docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
#     -i /local/tmdb_spec.json \
#     -g typescript-fetch \
#     -o /local/generated/openapi-tmdb

# cp ./generated/openapi-tmdb/models/__edited__GETSearchMulti200Response.ts ./generated/openapi-tmdb/models/GETSearchMulti200Response.ts
# cp ./generated/openapi-tmdb/models/__edited__GETTvTvIdSeasonSeasonNumber200Response.ts ./generated/openapi-tmdb/models/GETTvTvIdSeasonSeasonNumber200Response.ts

# npx prisma generate