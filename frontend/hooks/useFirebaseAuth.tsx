import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { useAuth } from "../contexts/AuthContext";
import { firebaseAuth } from "../services/AuthService";



type UseAuthContent = {
  registerUserToFirebase: (
    email: string,
    password: string
  ) => Promise<User | undefined>;
  connectUserToFirebase: (
    email: string,
    password: string
  ) => Promise<User | undefined>;
  disconnectUserFromFirebase: () => Promise<void>;
};





export default function useFirebaseAuth(): UseAuthContent {
  const { user, updateUser, setAccessToken } = useAuth();
  const registerUserToFirebase = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {

    const userCredentials = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    if (userCredentials.user) {
      const user = userCredentials.user;     
      return user;
    }
    return undefined;
  };

  const connectUserToFirebase = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    try{
      const userCredentials = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      if (userCredentials.user) {
        const user = userCredentials.user;
        updateUser(user);
        const token = await user.getIdTokenResult();
        setAccessToken(token);
        console.log("USER:",  user);
        return user;
      }
      return undefined;
    }catch(error : any){
      console.error(error?.code, error?.message)
      throw error;
    }
  };

  const disconnectUserFromFirebase = async (): Promise<void> => {
    await signOut(firebaseAuth);
    updateUser(null);
  };

  return {
    registerUserToFirebase,
    connectUserToFirebase,
    disconnectUserFromFirebase,
  };
}
