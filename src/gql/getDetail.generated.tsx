import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetDetailQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetDetailQuery = { __typename?: 'Query', data?: Array<{ __typename?: 'Data', id: number, name?: string | null, safename?: string | null, text?: string | null, price?: number | null, baskets?: Array<{ __typename?: 'Basket', id: number, date?: any | null } | null> | null, category?: { __typename?: 'Category', id: number, name?: string | null, safename?: string | null } | null, sells_items?: Array<{ __typename?: 'SellsItem', id: number, sell?: { __typename?: 'Sells', id: number, done?: boolean | null } | null } | null> | null } | null> | null, image?: Array<{ __typename?: 'Image', imageName?: string | null } | null> | null };


export const GetDetailDocument = gql`
    query getDetail($name: String) {
  data(safename: [$name]) {
    id
    name
    safename
    text
    price
    baskets {
      id
      date
    }
    category {
      id
      name
      safename
    }
    sells_items {
      id
      sell {
        id
        done
      }
    }
  }
  image(dataSafename: [$name]) {
    imageName
  }
}
    `;

export function useGetDetailQuery(options?: Omit<Urql.UseQueryArgs<GetDetailQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDetailQuery, GetDetailQueryVariables>({ query: GetDetailDocument, ...options });
};