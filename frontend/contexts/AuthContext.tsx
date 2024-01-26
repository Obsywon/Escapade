import { IdTokenResult, User } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";



// Interface pour le contexte
interface AuthContextProps {
  user: User | null;
  updateUser: (newUser: User | null) => void;
  accessToken: IdTokenResult | null,
  setAccessToken: (token: IdTokenResult | null) => void,
}

// Création du contexte
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook personnalisé pour accéder au contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Interface pour le composant AuthProvider
interface AuthProviderProps {
  children: JSX.Element;
}

// Composant AuthProvider qui fournit le contexte aux composants enfants
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<IdTokenResult  |null>(null);



  // Fonction pour mettre à jour l'utilisateur
  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  // Valeur du contexte fournie aux composants enfants
  const contextValue: AuthContextProps = {
    user,
    updateUser,
    accessToken,
    setAccessToken
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
