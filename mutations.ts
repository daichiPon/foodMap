/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createLocation = /* GraphQL */ `mutation CreateLocation(
  $condition: ModelLocationConditionInput
  $input: CreateLocationInput!
) {
  createLocation(condition: $condition, input: $input) {
    address
    category
    closed
    createdAt
    description
    facorite
    hours
    id
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
export const deleteLocation = /* GraphQL */ `mutation DeleteLocation(
  $condition: ModelLocationConditionInput
  $input: DeleteLocationInput!
) {
  deleteLocation(condition: $condition, input: $input) {
    address
    category
    closed
    createdAt
    description
    facorite
    hours
    id
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
export const updateLocation = /* GraphQL */ `mutation UpdateLocation(
  $condition: ModelLocationConditionInput
  $input: UpdateLocationInput!
) {
  updateLocation(condition: $condition, input: $input) {
    address
    category
    closed
    createdAt
    description
    facorite
    hours
    id
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
