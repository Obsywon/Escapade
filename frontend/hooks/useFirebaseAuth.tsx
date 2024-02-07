import {
  signOut,
} from "firebase/auth";

import { firebaseAuth } from "../services/AuthService";



type UseAuthContent = {
  disconnectUserFromFirebase: () => Promise<void>;
};





export default function useFirebaseAuth(): UseAuthContent {



  const disconnectUserFromFirebase = async (): Promise<void> => {
    await signOut(firebaseAuth);
    //updateUser(null);
  };


  return {
    disconnectUserFromFirebase,
  };
}
