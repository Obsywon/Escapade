import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setUser, unsetUser } from "../slices/userSlice";
import { useEffect, useState } from "react";
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
      setUser(user);
      return user;
    }
    return undefined;
  };

  const connectUserToFirebase = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    const userCredentials = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    if (userCredentials.user) {
      const user = userCredentials.user;
      setUser(user);
      console.log(user);
      return user;
    }
    return undefined;
  };

  const disconnectUserFromFirebase = async (): Promise<void> => {
    await signOut(firebaseAuth);
    unsetUser();
  };

  return {
    registerUserToFirebase,
    connectUserToFirebase,
    disconnectUserFromFirebase,
  };
}
