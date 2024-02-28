import { gql, useMutation, useQuery } from "@apollo/client";

const USER_BY_ID_QUERY = gql`
  query GetUserById($id: ID!) {
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

export const useGetUserById = (id: string) => {
    const { loading, error, data } = useQuery(USER_BY_ID_QUERY, {
      variables: { id },
    });
  
    return { loading, error, user: data?.userById };
  };