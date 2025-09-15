/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
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

export type DeleteLocationInput = {
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

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
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
