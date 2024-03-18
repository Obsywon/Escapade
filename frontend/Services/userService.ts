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

/**
export function getUserById (id: string) 
  {
    const { loading, error, data } = useQuery(USER_BY_ID_QUERY, {
      variables: { id },
      fetchPolicy: 'cache-and-network',
      context: { headers : { 'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImViYzIwNzkzNTQ1NzExODNkNzFjZWJlZDI5YzU1YmVmMjdhZDJjY2IiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiR2FldGFuIEtvcnB5cyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9lc2NhcGFkZS0zN2Q1ZSIsImF1ZCI6ImVzY2FwYWRlLTM3ZDVlIiwiYXV0aF90aW1lIjoxNzEwNzY3MzE5LCJ1c2VyX2lkIjoiTHRESndXUTIyVVZKMHJqdnQ3ZWs0Mmh2UWtLMiIsInN1YiI6Ikx0REp3V1EyMlVWSjByanZ0N2VrNDJodlFrSzIiLCJpYXQiOjE3MTA3NjczMTksImV4cCI6MTcxMDc3MDkxOSwiZW1haWwiOiJnYWV0YW4ua29ycHlzQGhvdG1haWwuZnIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJnYWV0YW4ua29ycHlzQGhvdG1haWwuZnIiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mtrDRnkvHA-TRmhapRhfYK1tIbmK9CkIkOZLSvlukYekdxwhf8020su9GCy7NL-y2BcbH_huJFUlfxoqxLx7Y0QihqsPFIXJ2cIK9o2mSW6FVtCn_eE8fnE2BohDHtG9ThExeAUVqRcwg9zUp826mYXAd4mNV4EIZfN9VN9YhJjkKpEhKnO1JBx1l7UX5Z7JRwIUr_eSmYlQvFDWrHoUod4DfoISzTD77dJd-nJVwQplKGCUftiPE8phx6SQqhLFvf2SFI3-aWSqXVYsNi5OQpm1dumP8WZI-ykedJe5FwjV2GTd9dXTRPht6OnsDJ12WhQPQ6enz15fQUGezgy1YQ'}}
    });
  
    return { loading, error, user: data?.userById };
  };
  **/