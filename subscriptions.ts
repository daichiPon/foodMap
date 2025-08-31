/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateLocation = /* GraphQL */ `subscription OnCreateLocation(
  $filter: ModelSubscriptionLocationFilterInput
  $owner: String
) {
  onCreateLocation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateLocationSubscriptionVariables,
  APITypes.OnCreateLocationSubscription
>;
export const onDeleteLocation = /* GraphQL */ `subscription OnDeleteLocation(
  $filter: ModelSubscriptionLocationFilterInput
  $owner: String
) {
  onDeleteLocation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteLocationSubscriptionVariables,
  APITypes.OnDeleteLocationSubscription
>;
export const onUpdateLocation = /* GraphQL */ `subscription OnUpdateLocation(
  $filter: ModelSubscriptionLocationFilterInput
  $owner: String
) {
  onUpdateLocation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateLocationSubscriptionVariables,
  APITypes.OnUpdateLocationSubscription
>;
