import { gql, useQuery } from "@apollo/client";

export const ALL_PLACE_QUERY = gql`
  query GetAllPlace {
    allPlace {
        id
        name
        description
        coordinate{
          latitude
          longitude
        }
    }
  }
`;

export const ALL_PLACE_ADDED_BY_ME_QUERY = gql`
  query GetAllPlaceAddedByMe {
    allPlaceAddedByMe {
        id
        name
        description
        coordinate{
          latitude
          longitude
        }
    }
  }
`;

export const ALL_PLACE_ADDED_BY_USER_QUERY = gql`
  query GetAllPlaceAddedByUser($userId: String!) {
    allPlaceAddedByUser(userId: $userId) {
        id
        name
        description
        coordinate{
          latitude
          longitude
        }
    }
  }
`;

export const PLACE_BY_ID_QUERY = gql`
  query GetPlaceById($placeId: String!) {
    placeById(placeId: $placeId) {
        id
        name
        description
        coordinate{
          latitude
          longitude
        }
    }
  }
`;

export const CREATE_PLACE = gql`
  mutation createPlace($input: CreatePlaceInput!) {
    createPlace(input: $input) {
        place{
            id
            name
            description
            coordinate{
              latitude
              longitude 
            }
        }
    }
  }
`


export function getAllPlace () 
  {
    const { loading, error, data } = useQuery(ALL_PLACE_QUERY, {fetchPolicy: 'cache-and-network'});
  
    return { loading, error, place: data?.getAllPlace };
  };

  export function getAllPlaceAddedByMe () 
  {
    const { loading, error, data } = useQuery(ALL_PLACE_ADDED_BY_ME_QUERY, {fetchPolicy: 'cache-and-network'});
  
    return { loading, error, place: data?.getAllPlaceAddedByMe };
  };

  export function getAllPlaceAddedByUser (id: string) 
  {
    const { loading, error, data } = useQuery(ALL_PLACE_ADDED_BY_USER_QUERY, {variables: { id }, fetchPolicy: 'cache-and-network'});
  
    return { loading, error, place: data?.getAllPlaceAddedByUser };
  };

  export function getPlaceById (id: string) 
  {
    const { loading, error, data } = useQuery(PLACE_BY_ID_QUERY, {variables: { id }, fetchPolicy: 'cache-and-network'});
  
    return { loading, error, place: data?.getPlaceById };
  };
