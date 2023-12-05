export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Basket = {
  __typename?: 'Basket';
  data_id?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  datum?: Maybe<Data>;
  id: Scalars['Int']['output'];
  session_id?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  data?: Maybe<Array<Maybe<Data>>>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  safename?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
};

export type Data = {
  __typename?: 'Data';
  baskets?: Maybe<Array<Maybe<Basket>>>;
  category?: Maybe<Category>;
  category_id?: Maybe<Scalars['Int']['output']>;
  created?: Maybe<Scalars['Date']['output']>;
  delivery?: Maybe<Scalars['Int']['output']>;
  homepages?: Maybe<Array<Maybe<Homepage>>>;
  id: Scalars['Int']['output'];
  id_image?: Maybe<Image>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  safename?: Maybe<Scalars['String']['output']>;
  sells_items?: Maybe<Array<Maybe<SellsItem>>>;
  size?: Maybe<Size>;
  size_id?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type Delivery = {
  __typename?: 'Delivery';
  cod?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  inc?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  sells?: Maybe<Array<Maybe<Sells>>>;
  size?: Maybe<Size>;
  size_id?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
  valid_from?: Maybe<Scalars['Date']['output']>;
  valid_to?: Maybe<Scalars['Date']['output']>;
};

export type Homepage = {
  __typename?: 'Homepage';
  data_id?: Maybe<Scalars['Int']['output']>;
  datum?: Maybe<Data>;
  id: Scalars['Int']['output'];
  sort?: Maybe<Scalars['Int']['output']>;
};

export type Image = {
  __typename?: 'Image';
  datum?: Maybe<Data>;
  imageName?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToBasket?: Maybe<Scalars['Int']['output']>;
};


export type MutationAddToBasketArgs = {
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Array<Maybe<Category>>>;
  data?: Maybe<Array<Maybe<Data>>>;
  delivery?: Maybe<Array<Maybe<Delivery>>>;
  find?: Maybe<Array<Maybe<Data>>>;
  homepage?: Maybe<Array<Maybe<Homepage>>>;
  image?: Maybe<Array<Maybe<Image>>>;
};


export type QueryCategoryArgs = {
  categorySafename?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  safename?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryFindArgs = {
  expr?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryImageArgs = {
  dataSafename?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Sells = {
  __typename?: 'Sells';
  date?: Maybe<Scalars['Date']['output']>;
  delivery?: Maybe<Delivery>;
  delivery_id?: Maybe<Scalars['Int']['output']>;
  delivery_price?: Maybe<Scalars['Int']['output']>;
  done?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  sells_items?: Maybe<Array<Maybe<SellsItem>>>;
  user_id?: Maybe<Scalars['Int']['output']>;
  vs?: Maybe<Scalars['Int']['output']>;
};

export type SellsItem = {
  __typename?: 'SellsItem';
  data_id?: Maybe<Scalars['Int']['output']>;
  datum?: Maybe<Data>;
  id: Scalars['Int']['output'];
  sell?: Maybe<Sells>;
  sells_id?: Maybe<Scalars['Int']['output']>;
};

export type Size = {
  __typename?: 'Size';
  data?: Maybe<Array<Maybe<Data>>>;
  deliveries?: Maybe<Array<Maybe<Delivery>>>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Text = {
  __typename?: 'Text';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};
