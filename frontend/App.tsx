import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import { PaperProvider } from "react-native-paper";
import GuestLayout from "./layouts/GuestLayout";
import ConnectedLayout from "./layouts/ConnectedLayout";

import { CustomTheme } from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import pageBienvenue from "./pages/pageBienvenue";
import InscriptionScreen from "./pages/InscriptionScreen";
import ConnexionScreen from "./pages/ConnexionScreen";

const Stack = createNativeStackNavigator();
const client = new ApolloClient({
  uri: "https://func-escapade-dev-fc.azurewebsites.net/api/graphql/",
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  const [connected, setConnected] = useState<boolean>(false);
  const [fonts, fontLoaded] = useCustomFonts();

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
    <ApolloProvider client={client}>
      <PaperProvider theme={{ ...CustomTheme, fonts }}>
        <NavigationContainer>
          {connected ? (
            <ConnectedLayout />
          ) : (
            <GuestLayout>
              <Stack.Navigator initialRouteName="pageBienvenue">
                <Stack.Screen name="pageBienvenue" component={pageBienvenue} />
                <Stack.Screen
                  name="InscriptionScreen"
                  component={InscriptionScreen}
                />
                <Stack.Screen
                  name="ConnexionScreen"
                  component={ConnexionScreen}
                />
              </Stack.Navigator>
            </GuestLayout>
          )}
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}

export default App;
