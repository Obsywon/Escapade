import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($entity: UserInput) {
      create(entity: $entity) {
        id
        name
        lastName
        gender
        email
        birthDate
      }
  }
`;

export interface UserInCreation {
  email: string;
  mot_de_passe: string;
  prenom: string;
  nom: string;
  date_de_naissance: Date | string;
  sexe?: string | undefined;
}

interface User extends UserInCreation {
  id: string;
}

export const useInscription = (): [
  (newUser: UserInCreation) => Promise<void>,
  User | undefined,
  string | undefined,
  boolean,
] => {
  const [data, setData] = useState<User | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const [createUserMutation] = useMutation(CREATE_USER_MUTATION);

  async function inscription(newUser: UserInCreation): Promise<void> {
    setData(undefined);
    setError(undefined);
    setLoading(true);

    try {
      const response = await createUserMutation({
        variables: {
          entity: {
            name: newUser.prenom,
            lastName: newUser.nom,
            gender: newUser.sexe,
            email: newUser.email,
            password: newUser.mot_de_passe,
            birthDate: newUser.date_de_naissance,
          },
        },
      });

      console.table(response);
      const user = response.data.create; 

      setData(user);
    } catch (err) {
      let message = "Erreur lors de l'inscription";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return [inscription, data, error, loading];
};
