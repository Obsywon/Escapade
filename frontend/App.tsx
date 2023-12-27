import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';

import { PaperProvider } from 'react-native-paper';
import GuestLayout from './layouts/GuestLayout';
import ConnectedLayout from './layouts/ConnectedLayout';
import pageBienvenue from './pages/pageBienvenue';
import InscriptionScreen from './pages/InscriptionScreen';
import {CustomTheme} from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

const Stack = createNativeStackNavigator();

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://func-escapade-dev-fc.azurewebsites.net/api/graphql/',
  cache: new InMemoryCache(),
});
=======
import { NavigationContainer } from "@react-navigation/native";

import { PaperProvider } from "react-native-paper";
import GuestLayout from "./layouts/GuestLayout";
import ConnectedLayout from "./layouts/ConnectedLayout";

import { CustomTheme } from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
>>>>>>> 4b7316e (correction bugs connexionscreen / app (affichage écrasée))

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import pageBienvenue from "./pages/pageBienvenue";
import InscriptionScreen from "./pages/InscriptionScreen";
import ConnexionScreen from "./pages/ConnexionScreen";

const Stack = createNativeStackNavigator();
const client = new ApolloClient({
  uri: "https://func-escapade-dev-fc.azurewebsites.net/api/graphql/",
  cache: new InMemoryCache(),
});

const fetchFonts = () => {
  return Font.loadAsync({
    // Définissez ici vos différentes polices
    'Fontastique': require('./assets/fonts/Fontastique.ttf'),
  });
};

const App: React.FC = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFonts();
      setDataLoaded(true);
    };


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
<<<<<<< HEAD
      <PaperProvider theme={{...CustomTheme, fonts}}>
          <NavigationContainer>
            { connected ? <ConnectedLayout /> : <GuestLayout />}
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
=======
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
<<<<<<< HEAD
>>>>>>> b01440e (page connexion à résoudre)
  )
=======
  );
>>>>>>> 4b7316e (correction bugs connexionscreen / app (affichage écrasée))
}

export default App;
