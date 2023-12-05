import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetInCategoryQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetInCategoryQuery = { __typename?: 'Query', category?: Array<{ __typename?: 'Category', safename?: string | null, data?: Array<{ __typename?: 'Data', id: number, name?: string | null, safename?: string | null, price?: number | null, category?: { __typename?: 'Category', safename?: string | null } | null, id_image?: { __typename?: 'Image', imageName?: string | null } | null, baskets?: Array<{ __typename?: 'Basket', date?: any | null } | null> | null, sells_items?: Array<{ __typename?: 'SellsItem', sell?: { __typename?: 'Sells', done?: boolean | null } | null } | null> | null } | null> | null } | null> | null };


export const GetInCategoryDocument = gql`
    query getInCategory($name: String) {
  category(categorySafename: [$name], limit: 1) {
    safename
    data {
      id
      name
      safename
      price
      category {
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

export function useGetInCategoryQuery(options?: Omit<Urql.UseQueryArgs<GetInCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<GetInCategoryQuery, GetInCategoryQueryVariables>({ query: GetInCategoryDocument, ...options });
};