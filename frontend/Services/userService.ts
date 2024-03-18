import { gql, useMutation, useQuery } from "@apollo/client";
import { Account, UpdateAccount } from "../types/Account";

export const USER_BY_ID_QUERY = gql`
  query GetUserById($id: String!) {
    userById(id: $id) {
      id
      name
      lastName
      gender
      birthDate
      email
      description
      phoneNumber
      city
      country
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {

      user {
        id
        name
        lastName
        birthDate
        gender
        description
        phoneNumber
        city
        country
      }
      errors {
        __typename
        ... on VerifyFirebaseTokenError {
          message
          code
        }
        ... on BirthdateInvalidFormatError {
          message
          code
        }
        ... on NameInvalidFormatError {
          message
          code
        }
      }
    }
  }
`


export function getUserById (id: string) 
  {
    const { loading, error, data } = useQuery(USER_BY_ID_QUERY, {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    });
  
    return { loading, error, user: data?.userById };
  };

