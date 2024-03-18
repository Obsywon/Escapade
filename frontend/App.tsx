import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MainLayout from "./layouts/MainLayout";

import { CustomTheme } from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import * as Location from "expo-location";
import { UserLocationContext } from "./contexts/UserLocationContext";

import env from "./env";
import { firebaseAuth } from "./services/AuthService";
import { IdTokenResult } from "firebase/auth";
import initGraphQLClient from "./services/GraphQLService";
import TabNavigator from "./navigation/TabNavigator";
import BienvenueScreen from "./pages/BienvenueScreen";
import ConnexionScreen from "./pages/ConnexionScreen";
import EditProfileScreen from "./pages/EditProfileScreen";
import InscriptionScreen from "./pages/InscriptionScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./pages/ProfileScreen";


export type AppNavigatorParamList = {
  Bienvenue: undefined;
  Inscription: undefined;
  Connexion: undefined;
  Dashboard: undefined;
  ModifierProfil: {
    uid: string,
  };
  Profil: {
    uid: string,
  },
};

const Stack = createStackNavigator<AppNavigatorParamList>();


function App(): JSX.Element {
  const [accessToken, setAccessToken] = useState<IdTokenResult | undefined>(undefined);
  const [fonts, fontLoaded] = useCustomFonts();
  const [accessLoaded, setAccessLoaded] = useState<boolean>(false);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  let client = new ApolloClient({
    uri: env.BACKEND_APP_URI,
    cache: new InMemoryCache(),
  });

  // Gère l'authentification automatique à l'application
  useEffect(() => {
    const sub = firebaseAuth.onAuthStateChanged((user) => {
      if (user == null){ // Pas authentifié
        setAccessLoaded(true);
        return null;
      }
      user // Authentification possible
        ?.getIdTokenResult()
        .then((accessToken) => {
          client = initGraphQLClient(accessToken.token);
          console.log("APP", accessToken.token);

          //console.log(accessToken);
          setAccessToken(accessToken);
        })
        .catch((error) => console.error(error))
        .finally(()=>setAccessLoaded(true));
    });
    return sub;
  }, []);

  // Pour la géolocalisation
  useEffect(() => {
    // Localisation
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("L'accès à la localisation a été refusé.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    })();
  }, []);

  if (!fontLoaded || !accessLoaded) {
    return (
      <ApolloProvider client={client}>
        <PaperProvider theme={CustomTheme}>
          <LoadingSurface text="Chargement en cours..." />
        </PaperProvider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={{ ...CustomTheme, fonts }}>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <NavigationContainer>
            <MainLayout>
              <Stack.Navigator initialRouteName={accessToken?.token ? "Dashboard" : "Bienvenue"}
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen name="Dashboard" component={TabNavigator} />
                {accessToken?.token && (
                  <>
                    <Stack.Screen
                      name="ModifierProfil"
                      component={EditProfileScreen}
                      initialParams={{ uid: firebaseAuth.currentUser?.uid }}
                      options={{ title: 'Modifier le profil' }}
                    />
                    <Stack.Screen
                      name="Profil"
                      component={ProfileScreen}
                      initialParams={{ uid: firebaseAuth.currentUser?.uid }}
                      options={{ title: 'Profil' }}
                    />
                  </>
                )}
                <Stack.Screen
                  name="Bienvenue"
                  component={BienvenueScreen}
                  options={{ title: 'Bienvenue' }}
                />
                <Stack.Screen
                  name="Inscription"
                  component={InscriptionScreen}
                  options={{ title: 'Inscription' }}
                />
                <Stack.Screen
                  name="Connexion"
                  component={ConnexionScreen}
                  options={{ title: 'Connexion' }}
                />
              </Stack.Navigator>
            </MainLayout>
          </NavigationContainer>
        </UserLocationContext.Provider>
      </PaperProvider>
    </ApolloProvider>
  );
  
}

export default App;
