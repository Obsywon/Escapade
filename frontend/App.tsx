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

export type AppNavigatorParamList = {
  Bienvenue: undefined;
  Inscription: undefined;
  Connexion: undefined;
  Dashboard: undefined;
  ModifierProfil: {
    uid: string,
  };
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

      user
        ?.getIdTokenResult()
        .then((accessToken) => {
          client = initGraphQLClient(accessToken.token);
          console.log(accessToken);
          setAccessToken(accessToken);
          setAccessLoaded(true);
        })
        .catch((error) => console.error(error));
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
              <Stack.Navigator initialRouteName="Bienvenue"
                screenOptions={{
                  headerShown: false
                }}
              >

                {accessToken?.token ? (
                  <>
                    <Stack.Screen name="Dashboard" component={TabNavigator} />
                    <Stack.Screen
                      name="ModifierProfil"
                      component={EditProfileScreen}
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
