import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MainLayout from "./layouts/MainLayout";

import { CustomTheme } from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AppNavigator from "./navigation/AppNavigator";

import * as Location from "expo-location";
import { UserLocationContext } from "./contexts/UserLocationContext";

import env from "./env";
import { firebaseAuth } from "./services/AuthService";
import { IdTokenResult, User } from "firebase/auth";
import initGraphQLClient from "./services/GraphQLService";
import TabNavigator from "./navigation/TabNavigator";

function App(): JSX.Element {
  const [accessToken, setAccessToken] = useState<IdTokenResult | undefined>(undefined);
  const [fonts, fontLoaded] = useCustomFonts();
  const [accessLoaded, setAccessLoaded] = useState<boolean>(false);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // const [fontsLoaded] = useFonts({
  //   'raleway': require('./assets/Fonts/Raleway-Regular.ttf'),
  //   'raleway-SemiBold': require('./assets/Fonts/Raleway-SemiBold.ttf'),
  // });

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
              {accessToken?.token ? <TabNavigator /> : <AppNavigator/>}
            </MainLayout>
          </NavigationContainer>
        </UserLocationContext.Provider>
      </PaperProvider>
    </ApolloProvider>
  );
}

export default App;
