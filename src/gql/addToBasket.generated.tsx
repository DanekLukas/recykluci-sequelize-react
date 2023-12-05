import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AddToBasketMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type AddToBasketMutation = { __typename?: 'Mutation', addToBasket?: number | null };


export const AddToBasketDocument = gql`
    mutation addToBasket($id: Int!) {
  addToBasket(id: $id)
}
    `;

export function useAddToBasketMutation() {
  return Urql.useMutation<AddToBasketMutation, AddToBasketMutationVariables>(AddToBasketDocument);
};