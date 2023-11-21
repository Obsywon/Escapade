import {useState} from 'react';

const URL: string = 'https://func-escapade-dev-fc.azurewebsites.net/api/users';

interface UserInCreation {
  email: string;
  mot_de_passe: string;
  prenom: string;
  nom: string;
  date_de_naissance: Date | string;
  genre?: string;
}

interface User extends UserInCreation {
  id: string;
}

const createUser = async (data: UserInCreation): Promise<any> => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok || response.status !== 201) {
    throw new Error("Erreur lors de l'inscription. ");
  }

  const body = await response.json();
  console.table(body);
  return body.body;
};

export const useInscription = (): [
  (newUser: UserInCreation) => Promise<void>,
  User | undefined,
  string | undefined,
  boolean,
] => {
  const [data, setData] = useState<User | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  async function inscription(newUser: UserInCreation): Promise<void> {
    setData(undefined);
    setError(undefined);
    setLoading(true);

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      console.log(response);

      const user = await response.json();
      console.log(user);
      setData(user);
    } catch (err) {
      let message = 'Erreur inscription';
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
