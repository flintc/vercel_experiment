import { CodegenConfig } from "@graphql-codegen/cli";
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const config: CodegenConfig = {
  schema: {
    "https://adequate-ladybug-87.hasura.app/v1/graphql": {
      headers: {
        "x-hasura-admin-secret": process.env.HARURA_ADMIN_SECRET,
      },
    },
  },
  // documents: ["src/**/*.tsx", "src/**/*.ts"],
  documents: ["document.ts", "**/*.documents.ts"],
  generates: {
    "generated/gql/": {
      preset: "client",
      plugins: [],
      // presetConfig: {
      //   gqlTagName: "gql",
      // },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
