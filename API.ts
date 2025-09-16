/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Follow = {
  __typename: "Follow",
  createdAt: string,
  followeeId: string,
  followerId: string,
  id: string,
  owner?: string | null,
  updatedAt: string,
};

export type Location = {
  __typename: "Location",
  address?: string | null,
  category?: string | null,
  closed?: string | null,
  createdAt: string,
  description?: string | null,
  favorite?: boolean | null,
  hours?: string | null,
  id: string,
  imageUrl?: string | null,
  latitude?: number | null,
  longitude?: number | null,
  name?: string | null,
  owner?: string | null,
  priceRange?: string | null,
  rating?: number | null,
  updatedAt: string,
};

export type User = {
  __typename: "User",
  cognitoSub?: string | null,
  createdAt: string,
  email: string,
  id: string,
  owner?: string | null,
  profileImage?: string | null,
  updatedAt: string,
  username: string,
};

export type ModelFollowFilterInput = {
  and?: Array< ModelFollowFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  followeeId?: ModelStringInput | null,
  followerId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelFollowFilterInput | null,
  or?: Array< ModelFollowFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelFollowConnection = {
  __typename: "ModelFollowConnection",
  items:  Array<Follow | null >,
  nextToken?: string | null,
};

export type ModelLocationFilterInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelLocationFilterInput | null > | null,
  category?: ModelStringInput | null,
  closed?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  favorite?: ModelBooleanInput | null,
  hours?: ModelStringInput | null,
  id?: ModelIDInput | null,
  imageUrl?: ModelStringInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  name?: ModelStringInput | null,
  not?: ModelLocationFilterInput | null,
  or?: Array< ModelLocationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  priceRange?: ModelStringInput | null,
  rating?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelLocationConnection = {
  __typename: "ModelLocationConnection",
  items:  Array<Location | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  and?: Array< ModelUserFilterInput | null > | null,
  cognitoSub?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
  profileImage?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelFollowConditionInput = {
  and?: Array< ModelFollowConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  followeeId?: ModelStringInput | null,
  followerId?: ModelStringInput | null,
  not?: ModelFollowConditionInput | null,
  or?: Array< ModelFollowConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateFollowInput = {
  followeeId: string,
  followerId: string,
  id?: string | null,
};

export type ModelLocationConditionInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelLocationConditionInput | null > | null,
  category?: ModelStringInput | null,
  closed?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  favorite?: ModelBooleanInput | null,
  hours?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  name?: ModelStringInput | null,
  not?: ModelLocationConditionInput | null,
  or?: Array< ModelLocationConditionInput | null > | null,
  owner?: ModelStringInput | null,
  priceRange?: ModelStringInput | null,
  rating?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateLocationInput = {
  address?: string | null,
  category?: string | null,
  closed?: string | null,
  description?: string | null,
  favorite?: boolean | null,
  hours?: string | null,
  id?: string | null,
  imageUrl?: string | null,
  latitude?: number | null,
  longitude?: number | null,
  name?: string | null,
  priceRange?: string | null,
  rating?: number | null,
};

export type ModelUserConditionInput = {
  and?: Array< ModelUserConditionInput | null > | null,
  cognitoSub?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  owner?: ModelStringInput | null,
  profileImage?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
};

export type CreateUserInput = {
  cognitoSub?: string | null,
  email: string,
  id?: string | null,
  profileImage?: string | null,
  username: string,
};

export type DeleteFollowInput = {
  id: string,
};

export type DeleteLocationInput = {
  id: string,
};

export type DeleteUserInput = {
  id: string,
};

export type UpdateFollowInput = {
  followeeId?: string | null,
  followerId?: string | null,
  id: string,
};

export type UpdateLocationInput = {
  address?: string | null,
  category?: string | null,
  closed?: string | null,
  description?: string | null,
  favorite?: boolean | null,
  hours?: string | null,
  id: string,
  imageUrl?: string | null,
  latitude?: number | null,
  longitude?: number | null,
  name?: string | null,
  priceRange?: string | null,
  rating?: number | null,
};

export type UpdateUserInput = {
  cognitoSub?: string | null,
  email?: string | null,
  id: string,
  profileImage?: string | null,
  username?: string | null,
};

export type ModelSubscriptionFollowFilterInput = {
  and?: Array< ModelSubscriptionFollowFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  followeeId?: ModelSubscriptionStringInput | null,
  followerId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionFollowFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionLocationFilterInput = {
  address?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLocationFilterInput | null > | null,
  category?: ModelSubscriptionStringInput | null,
  closed?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  favorite?: ModelSubscriptionBooleanInput | null,
  hours?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  latitude?: ModelSubscriptionFloatInput | null,
  longitude?: ModelSubscriptionFloatInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionLocationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  priceRange?: ModelSubscriptionStringInput | null,
  rating?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  cognitoSub?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
  profileImage?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
};

export type GetFollowQueryVariables = {
  id: string,
};

export type GetFollowQuery = {
  getFollow?:  {
    __typename: "Follow",
    createdAt: string,
    followeeId: string,
    followerId: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type GetLocationQueryVariables = {
  id: string,
};

export type GetLocationQuery = {
  getLocation?:  {
    __typename: "Location",
    address?: string | null,
    category?: string | null,
    closed?: string | null,
    createdAt: string,
    description?: string | null,
    favorite?: boolean | null,
    hours?: string | null,
    id: string,
    imageUrl?: string | null,
    latitude?: number | null,
    longitude?: number | null,
    name?: string | null,
    owner?: string | null,
    priceRange?: string | null,
    rating?: number | null,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    cognitoSub?: string | null,
    createdAt: string,
    email: string,
    id: string,
    owner?: string | null,
    profileImage?: string | null,
    updatedAt: string,
    username: string,
  } | null,
};

export type ListFollowsQueryVariables = {
  filter?: ModelFollowFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFollowsQuery = {
  listFollows?:  {
    __typename: "ModelFollowConnection",
    items:  Array< {
      __typename: "Follow",
      createdAt: string,
      followeeId: string,
      followerId: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLocationsQueryVariables = {
  filter?: ModelLocationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLocationsQuery = {
  listLocations?:  {
    __typename: "ModelLocationConnection",
    items:  Array< {
      __typename: "Location",
      address?: string | null,
      category?: string | null,
      closed?: string | null,
      createdAt: string,
      description?: string | null,
      favorite?: boolean | null,
      hours?: string | null,
      id: string,
      imageUrl?: string | null,
      latitude?: number | null,
      longitude?: number | null,
      name?: string | null,
      owner?: string | null,
      priceRange?: string | null,
      rating?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      cognitoSub?: string | null,
      createdAt: string,
      email: string,
      id: string,
      owner?: string | null,
      profileImage?: string | null,
      updatedAt: string,
      username: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateFollowMutationVariables = {
  condition?: ModelFollowConditionInput | null,
  input: CreateFollowInput,
};

export type CreateFollowMutation = {
  createFollow?:  {
    __typename: "Follow",
    createdAt: string,
    followeeId: string,
    followerId: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateLocationMutationVariables = {
  condition?: ModelLocationConditionInput | null,
  input: CreateLocationInput,
};

export type CreateLocationMutation = {
  createLocation?:  {
    __typename: "Location",
    address?: string | null,
    category?: string | null,
    closed?: string | null,
    createdAt: string,
    description?: string | null,
    favorite?: boolean | null,
    hours?: string | null,
    id: string,
    imageUrl?: string | null,
    latitude?: number | null,
    longitude?: number | null,
    name?: string | null,
    owner?: string | null,
    priceRange?: string | null,
    rating?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    cognitoSub?: string | null,
    createdAt: string,
    email: string,
    id: string,
    owner?: string | null,
    profileImage?: string | null,
    updatedAt: string,
    username: string,
  } | null,
};

export type DeleteFollowMutationVariables = {
  condition?: ModelFollowConditionInput | null,
  input: DeleteFollowInput,
};

export type DeleteFollowMutation = {
  deleteFollow?:  {
    __typename: "Follow",
    createdAt: string,
    followeeId: string,
    followerId: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteLocationMutationVariables = {
  condition?: ModelLocationConditionInput | null,
  input: DeleteLocationInput,
};

export type DeleteLocationMutation = {
  deleteLocation?:  {
    __typename: "Location",
    address?: string | null,
    category?: string | null,
    closed?: string | null,
    createdAt: string,
    description?: string | null,
    favorite?: boolean | null,
    hours?: string | null,
    id: string,
    imageUrl?: string | null,
    latitude?: number | null,
    longitude?: number | null,
    name?: string | null,
    owner?: string | null,
    priceRange?: string | null,
    rating?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    cognitoSub?: string | null,
    createdAt: string,
    email: string,
    id: string,
    owner?: string | null,
    profileImage?: string | null,
    updatedAt: string,
    username: string,
  } | null,
};

export type UpdateFollowMutationVariables = {
  condition?: ModelFollowConditionInput | null,
  input: UpdateFollowInput,
};

export type UpdateFollowMutation = {
  updateFollow?:  {
    __typename: "Follow",
    createdAt: string,
    followeeId: string,
    followerId: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateLocationMutationVariables = {
  condition?: ModelLocationConditionInput | null,
  input: UpdateLocationInput,
};

export type UpdateLocationMutation = {
  updateLocation?:  {
    __typename: "Location",
    address?: string | null,
    category?: string | null,
    closed?: string | null,
    createdAt: string,
    description?: string | null,
    favorite?: boolean | null,
    hours?: string | null,
    id: string,
    imageUrl?: string | null,
    latitude?: number | null,
    longitude?: number | null,
    name?: string | null,
    owner?: string | null,
    priceRange?: string | null,
    rating?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    cognitoSub?: string | null,
    createdAt: string,
    email: string,
    id: string,
    owner?: string | null,
    profileImage?: string | null,
    updatedAt: string,
    username: string,
  } | null,
};

export type OnCreateFollowSubscriptionVariables = {
  filter?: ModelSubscriptionFollowFilterInput | null,
  owner?: string | null,
};

export type OnCreateFollowSubscription = {
  onCreateFollow?:  {
    __typename: "Follow",
    createdAt: string,
    followeeId: string,
    followerId: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateLocationSubscriptionVariables = {
  filter?: ModelSubscriptionLocationFilterInput | null,
  owner?: string | null,
};

export type OnCreateLocationSubscription = {
  onCreateLocation?:  {
    __typename: "Location",
    address?: string | null,
    category?: string | null,
    closed?: string | null,
    createdAt: string,
    description?: string | null,
    favorite?: boolean | null,
    hours?: string | null,
    id: string,
    imageUrl?: string | null,
    latitude?: number | null,
    longitude?: number | null,
    name?: string | null,
    owner?: string | null,
    priceRange?: string | null,
    rating?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    cognitoSub?: string | null,
    createdAt: string,
    email: string,
    id: string,
    owner?: string | null,
    profileImage?: string | null,
    updatedAt: string,
    username: string,
  } | null,
};

export type OnDeleteFollowSubscriptionVariables = {
  filter?: ModelSubscriptionFollowFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFollowSubscription = {
  onDeleteFollow?:  {
    __typename: "Follow",
    createdAt: string,
    followeeId: string,
    followerId: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteLocationSubscriptionVariables = {
  filter?: ModelSubscriptionLocationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteLocationSubscription = {
  onDeleteLocation?:  {
    __typename: "Location",
    address?: string | null,
    category?: string | null,
    closed?: string | null,
    createdAt: string,
    description?: string | null,
    favorite?: boolean | null,
    hours?: string | null,
    id: string,
    imageUrl?: string | null,
    latitude?: number | null,
    longitude?: number | null,
    name?: string | null,
    owner?: string | null,
    priceRange?: string | null,
    rating?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    cognitoSub?: string | null,
    createdAt: string,
    email: string,
    id: string,
    owner?: string | null,
    profileImage?: string | null,
    updatedAt: string,
    username: string,
  } | null,
};

export type OnUpdateFollowSubscriptionVariables = {
  filter?: ModelSubscriptionFollowFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFollowSubscription = {
  onUpdateFollow?:  {
    __typename: "Follow",
    createdAt: string,
    followeeId: string,
    followerId: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateLocationSubscriptionVariables = {
  filter?: ModelSubscriptionLocationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateLocationSubscription = {
  onUpdateLocation?:  {
    __typename: "Location",
    address?: string | null,
    category?: string | null,
    closed?: string | null,
    createdAt: string,
    description?: string | null,
    favorite?: boolean | null,
    hours?: string | null,
    id: string,
    imageUrl?: string | null,
    latitude?: number | null,
    longitude?: number | null,
    name?: string | null,
    owner?: string | null,
    priceRange?: string | null,
    rating?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    cognitoSub?: string | null,
    createdAt: string,
    email: string,
    id: string,
    owner?: string | null,
    profileImage?: string | null,
    updatedAt: string,
    username: string,
  } | null,
};
