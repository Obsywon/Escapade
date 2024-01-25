import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setUser, unsetUser } from "../slices/userSlice";
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Configuration de Firebase
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

type UseAuthContent = {
  registerUserToFirebase: (email: string, password: string) => Promise<User | undefined>;
  connectUserToFirebase: (email: string, password: string) => Promise<User | undefined>;
  disconnectUserFromFirebase: () => Promise<void>;
};

/**
 * Initialise l'authentification Firebase
 * @returns Auth
 */
function initAuth(): Auth {
  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  return auth;
}

export default function useFirebaseAuth(): UseAuthContent {
  const registerUserToFirebase = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    const auth = initAuth();
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
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
    const auth = initAuth();
    const userCredentials = await signInWithEmailAndPassword(
      auth,
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
    const auth = initAuth();
    await signOut(auth);
    unsetUser();
  };

  return {
    registerUserToFirebase,
    connectUserToFirebase,
    disconnectUserFromFirebase,
  };
}
