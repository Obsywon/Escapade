const URL: string = 'https://azurefunctionescapade.azurewebsites.net/api/users';

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

export default createUser;
