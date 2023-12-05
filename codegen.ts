import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://recykluci.home.danek-family.cz:6200/graphql/",
  documents: "src/**/*.gql",
  generates: {
    "src/gql/types.ts": { plugins: ["typescript"] },
    "src/gql/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "types.ts",
      },
      plugins: ["typescript-operations", "typescript-urql"],
      config: {
        method: "post",
        withHooks: "true",
      },
    },
  },
};
export default config;
