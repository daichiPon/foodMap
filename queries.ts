/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getFollow = /* GraphQL */ `query GetFollow($id: ID!) {
  getFollow(id: $id) {
    createdAt
    followeeId
    followerId
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetFollowQueryVariables, APITypes.GetFollowQuery>;
export const getLocation = /* GraphQL */ `query GetLocation($id: ID!) {
  getLocation(id: $id) {
    address
    category
    closed
    cognitoSub
    createdAt
    description
    favorite
    hours
    id
    imageUrl
    latitude
    longitude
    name
    owner
    priceRange
    rating
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLocationQueryVariables,
  APITypes.GetLocationQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    cognitoSub
    createdAt
    email
    id
    owner
    profileImage
    updatedAt
    username
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listFollows = /* GraphQL */ `query ListFollows(
  $filter: ModelFollowFilterInput
  $limit: Int
  $nextToken: String
) {
  listFollows(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      followeeId
      followerId
      id
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFollowsQueryVariables,
  APITypes.ListFollowsQuery
>;
export const listLocations = /* GraphQL */ `query ListLocations(
  $filter: ModelLocationFilterInput
  $limit: Int
  $nextToken: String
) {
  listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      address
      category
      closed
      cognitoSub
      createdAt
      description
      favorite
      hours
      id
      imageUrl
      latitude
      longitude
      name
      owner
      priceRange
      rating
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLocationsQueryVariables,
  APITypes.ListLocationsQuery
>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      cognitoSub
      createdAt
      email
      id
      owner
      profileImage
      updatedAt
      username
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
