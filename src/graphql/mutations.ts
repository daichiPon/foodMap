// src/graphql/mutations.ts
export const createLocation = /* GraphQL */ `
  mutation CreateLocation($input: CreateLocationInput!) {
    createLocation(input: $input) {
      id
      name
      description
      category
      priceRange
      latitude
      longitude
      address
      owner
    }
  }
`;

export const listLocations = /* GraphQL */ `
  query ListLocations {
    listLocations {
      items {
        id
        name
        description
        category
        priceRange
        latitude
        longitude
        address
        owner
      }
    }
  }
`;
