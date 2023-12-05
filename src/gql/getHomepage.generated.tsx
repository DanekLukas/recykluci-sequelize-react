import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetHomepageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetHomepageQuery = { __typename?: 'Query', homepage?: Array<{ __typename?: 'Homepage', datum?: { __typename?: 'Data', id: number, name?: string | null, safename?: string | null, price?: number | null, category?: { __typename?: 'Category', name?: string | null, safename?: string | null } | null, id_image?: { __typename?: 'Image', imageName?: string | null } | null, baskets?: Array<{ __typename?: 'Basket', date?: any | null } | null> | null, sells_items?: Array<{ __typename?: 'SellsItem', sell?: { __typename?: 'Sells', done?: boolean | null } | null } | null> | null } | null } | null> | null };


export const GetHomepageDocument = gql`
    query getHomepage {
  homepage {
    datum {
      id
      name
      safename
      price
      category {
        name
        safename
      }
      id_image {
        imageName
      }
      baskets {
        date
      }
      sells_items {
        sell {
          done
        }
      }
    }
  }
}
    `;

export function useGetHomepageQuery(options?: Omit<Urql.UseQueryArgs<GetHomepageQueryVariables>, 'query'>) {
  return Urql.useQuery<GetHomepageQuery, GetHomepageQueryVariables>({ query: GetHomepageDocument, ...options });
};