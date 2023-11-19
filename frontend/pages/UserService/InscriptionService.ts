interface UserInCreation {
  email: string;
  password: string;
  prenom: string;
  nom: string;
  date: Date | string;
}

interface User extends UserInCreation {
  id: string;
}

const createUser = async (data: UserInCreation): Promise<User> => {};

export default createUser;
