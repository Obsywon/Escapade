import { gql, useMutation, useQuery } from "@apollo/client";
import { Account, UpdateAccount } from "../types/Account";

const USER_BY_ID_QUERY = gql`
  query GetUserById($id: String!) {
    userById(id: $id) {
      id
      name
      lastName
      gender
      birthDate
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateThisUserInput!) {
    updateThisUser(input: $input) {

      user {
        id
        name
        lastname
        birthDate
        gender
      }
    }
  }
`

/*
description
phone
city
country
*/

export function getUserById (id: string) 
  {
    const { loading, error, data } = useQuery(USER_BY_ID_QUERY, {
      variables: { id },
    });
  
    return { loading, error, user: data?.userById };
  };

  /*
export function updateUser (){
  const [UpdateUser, {loading, error, data}] = useMutation(UPDATE_USER, {
    variables: user
  });
  console.log("UPDAAAATE: ", loading, error, data, UpdateUser);
  return { loading, error, user: data?.updateThisUser}
}*/