import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import GuestLayout from "./layouts/GuestLayout";

import { CustomTheme } from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AppNavigator from "./navigation/AppNavigator";

import * as Location from "expo-location";
import { UserLocationContext } from "./contexts/UserLocationContext";

import GraphQLClient from "./services/GraphQLService";
import { AuthProvider } from "./contexts/AuthContext";
import env from "./env";

function App(): JSX.Element {
  const [fonts, fontLoaded] = useCustomFonts();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // const [fontsLoaded] = useFonts({
  //   'raleway': require('./assets/Fonts/Raleway-Regular.ttf'),
  //   'raleway-SemiBold': require('./assets/Fonts/Raleway-SemiBold.ttf'),
  // });

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    })();
  }, []);

  const client = new ApolloClient({
    uri: env.BACKEND_APP_URI,
    cache: new InMemoryCache(),
  });

  if (!fontLoaded) {
    return (
      <ApolloProvider client={client}>
        <PaperProvider theme={CustomTheme}>
          <LoadingSurface text="Chargement en cours..." />
        </PaperProvider>
      </ApolloProvider>
    );
  }

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <PaperProvider theme={{ ...CustomTheme, fonts }}>
          <UserLocationContext.Provider value={{ location, setLocation }}>
            <NavigationContainer>
              <GuestLayout>
                <AppNavigator />
              </GuestLayout>
            </NavigationContainer>
          </UserLocationContext.Provider>
        </PaperProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
