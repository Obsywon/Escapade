import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ReactElement, createContext, useEffect, useState } from "react";


const firebaseConfig = {
    apiKey: "AIzaSyCfaZTRP3qpC_XqVpZgMAEs2b10E0-j12c",
    authDomain: "escapade-37d5e.firebaseapp.com",
    projectId: "escapade-37d5e",
    storageBucket: "escapade-37d5e.appspot.com",
    messagingSenderId: "509799142893",
    appId: "1:509799142893:web:464b7ae509e92c6453c3e4"
    };

export type AuthContextProps = {
    user: User | undefined,
    auth?: Auth,
    inscription: (email: string, password: string) => Promise<User|undefined>,
    connexion: (email: string, password: string) => Promise<User|undefined>,
    deconnexion: () => Promise<void>,
}

const AuthContext = createContext<AuthContextProps|undefined>(undefined);



export const AuthProvider = ({children}) => {
    const [user, setUser] = useState<User>();
    const [auth, setAuth] = useState<Auth>();

    useEffect(()=>{
        const app = initializeApp(firebaseConfig);
        const authentification = getAuth(app);
        setAuth(authentification);
    }, []);

    async function inscription(email: string, password: string): Promise<User|undefined>{
        const userCredentials = await createUserWithEmailAndPassword(auth!, email, password);
        if (userCredentials.user){
            setUser(userCredentials.user);
            console.log("L'utilisateur a bien été enregistré")
        }
        return user;
    }

    async function connexion(email: string, password: string): Promise<User|undefined>{
        const userCredentials = await signInWithEmailAndPassword(auth!, email, password);
        if (userCredentials.user){
            setUser(userCredentials.user);
        }
        return user;
    }

    async function deconnexion(){
        await signOut(auth!);
        setUser(undefined);
    }

    const value: AuthContextProps = {
        user,
        inscription,
        connexion,
        deconnexion,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}