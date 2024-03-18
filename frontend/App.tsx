import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MainLayout from "./layouts/MainLayout";

import { CustomTheme } from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

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
import { setContext } from "@apollo/client/link/context";


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

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  

  // Gère l'authentification automatique à l'application
  useEffect(() => {
    const sub = firebaseAuth.onAuthStateChanged((user) => {
      if (user == null) { // Pas authentifié
        setAccessToken(undefined);
        return null;
      }
      user // Authentification possible
        ?.getIdTokenResult()
        .then((accessToken) => {
          setAccessToken(accessToken);
        })
        .catch((error) => console.error(error))

    });
    return sub;
  }, []);

  const httpLink = new HttpLink({
    uri: env.BACKEND_APP_URI,
  });

  const authLink = setContext((_, { headers }) => {
    
    return {
      preserveHeaderCase: true,
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken?.token}`,
      },
    };
  });


  const client = new ApolloClient({
    uri: env.BACKEND_APP_URI,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  (async ()=>{
    await client.clearStore();
  })();

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

  if (!fontLoaded || !accessToken) {
    return (
      <PaperProvider theme={CustomTheme}>
        <LoadingSurface text="Chargement en cours..." />
      </PaperProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={{ ...CustomTheme, fonts }}>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <NavigationContainer>
            <MainLayout>
              <Stack.Navigator initialRouteName="Bienvenue"
                screenOptions={{
                  headerShown: false
                }}
              >

                {client ? (
                  <>
                    <Stack.Screen name="Dashboard" component={TabNavigator} />
                    <Stack.Screen
                      name="ModifierProfil"
                      component={EditProfileScreen}
                      initialParams={{ uid: firebaseAuth.currentUser?.uid }}
                    />
                    <Stack.Screen
                      name="Profil"
                      component={ProfileScreen}
                      initialParams={{ uid: firebaseAuth.currentUser?.uid }}
                    />
                  </>

                ) : (
                  <>
                    <Stack.Screen
                      name="Bienvenue"
                      component={BienvenueScreen}
                    />
                    <Stack.Screen
                      name="Inscription"
                      component={InscriptionScreen}
                    />
                    <Stack.Screen
                      name="Connexion"
                      component={ConnexionScreen}
                    />
                  </>
                )}
              </Stack.Navigator>
            </MainLayout>
          </NavigationContainer>
        </UserLocationContext.Provider>
      </PaperProvider>
    </ApolloProvider>
  );
}

export default App;
