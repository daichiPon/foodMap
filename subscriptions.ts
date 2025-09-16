/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateFollow = /* GraphQL */ `subscription OnCreateFollow(
  $filter: ModelSubscriptionFollowFilterInput
  $owner: String
) {
  onCreateFollow(filter: $filter, owner: $owner) {
    createdAt
    followeeId
    followerId
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFollowSubscriptionVariables,
  APITypes.OnCreateFollowSubscription
>;
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
` as GeneratedSubscription<
  APITypes.OnCreateLocationSubscriptionVariables,
  APITypes.OnCreateLocationSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteFollow = /* GraphQL */ `subscription OnDeleteFollow(
  $filter: ModelSubscriptionFollowFilterInput
  $owner: String
) {
  onDeleteFollow(filter: $filter, owner: $owner) {
    createdAt
    followeeId
    followerId
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFollowSubscriptionVariables,
  APITypes.OnDeleteFollowSubscription
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
` as GeneratedSubscription<
  APITypes.OnDeleteLocationSubscriptionVariables,
  APITypes.OnDeleteLocationSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateFollow = /* GraphQL */ `subscription OnUpdateFollow(
  $filter: ModelSubscriptionFollowFilterInput
  $owner: String
) {
  onUpdateFollow(filter: $filter, owner: $owner) {
    createdAt
    followeeId
    followerId
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFollowSubscriptionVariables,
  APITypes.OnUpdateFollowSubscription
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
` as GeneratedSubscription<
  APITypes.OnUpdateLocationSubscriptionVariables,
  APITypes.OnUpdateLocationSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
