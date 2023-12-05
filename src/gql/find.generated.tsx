import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type FindQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FindQuery = { __typename?: 'Query', find?: Array<{ __typename?: 'Data', id: number, name?: string | null, safename?: string | null, id_image?: { __typename?: 'Image', imageName?: string | null } | null, baskets?: Array<{ __typename?: 'Basket', date?: any | null } | null> | null, category?: { __typename?: 'Category', name?: string | null, safename?: string | null } | null, sells_items?: Array<{ __typename?: 'SellsItem', sell?: { __typename?: 'Sells', done?: boolean | null } | null } | null> | null } | null> | null };


export const FindDocument = gql`
    query find($name: String) {
  find(expr: $name, limit: 1) {
    id
    name
    safename
    id_image {
      imageName
    }
    baskets {
      date
    }
    category {
      name
      safename
    }
    sells_items {
      sell {
        done
      }
    }
  }
}
    `;

export function useFindQuery(options?: Omit<Urql.UseQueryArgs<FindQueryVariables>, 'query'>) {
  return Urql.useQuery<FindQuery, FindQueryVariables>({ query: FindDocument, ...options });
};