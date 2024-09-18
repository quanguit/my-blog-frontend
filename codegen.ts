import type { CodegenConfig } from '@graphql-codegen/cli';

require('dotenv').config();

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
  documents: 'src/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        // fetcher: {
        //   endpoint: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
        //   fetchParams: {
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   },
        // },
        fetcher: {
          func: '@/services#fetcher',
          // func: '@/services/fetcher-graphql#fetcher',
        },
        exposeFetcher: true,
        exposeQueryKeys: true,
        addInfiniteQuery: true,
        dedupeFragments: true,
        reactQueryVersion: 5,
      },
    },
  },
};
export default config;
