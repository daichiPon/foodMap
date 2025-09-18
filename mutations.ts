/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createFollow = /* GraphQL */ `mutation CreateFollow(
  $condition: ModelFollowConditionInput
  $input: CreateFollowInput!
) {
  createFollow(condition: $condition, input: $input) {
    createdAt
    followeeId
    followerId
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFollowMutationVariables,
  APITypes.CreateFollowMutation
>;
export const createLocation = /* GraphQL */ `mutation CreateLocation(
  $condition: ModelLocationConditionInput
  $input: CreateLocationInput!
) {
  createLocation(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateLocationMutationVariables,
  APITypes.CreateLocationMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteFollow = /* GraphQL */ `mutation DeleteFollow(
  $condition: ModelFollowConditionInput
  $input: DeleteFollowInput!
) {
  deleteFollow(condition: $condition, input: $input) {
    createdAt
    followeeId
    followerId
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFollowMutationVariables,
  APITypes.DeleteFollowMutation
>;
export const deleteLocation = /* GraphQL */ `mutation DeleteLocation(
  $condition: ModelLocationConditionInput
  $input: DeleteLocationInput!
) {
  deleteLocation(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteLocationMutationVariables,
  APITypes.DeleteLocationMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateFollow = /* GraphQL */ `mutation UpdateFollow(
  $condition: ModelFollowConditionInput
  $input: UpdateFollowInput!
) {
  updateFollow(condition: $condition, input: $input) {
    createdAt
    followeeId
    followerId
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFollowMutationVariables,
  APITypes.UpdateFollowMutation
>;
export const updateLocation = /* GraphQL */ `mutation UpdateLocation(
  $condition: ModelLocationConditionInput
  $input: UpdateLocationInput!
) {
  updateLocation(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateLocationMutationVariables,
  APITypes.UpdateLocationMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
