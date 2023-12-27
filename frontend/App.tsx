import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import GuestLayout from './layouts/GuestLayout';
import ConnectedLayout from './layouts/ConnectedLayout';
import {NavigationContainer} from "@react-navigation/native";
import {PaperProvider} from "react-native-paper";
import {CustomTheme} from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://func-escapade-dev-fc.azurewebsites.net/api/graphql/',
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  const [connected, setConnected] = useState<boolean>(false);
  const [fonts, fontLoaded] = useCustomFonts();

  if (!fontLoaded) {
    return (
      <ApolloProvider client={client}>
        <PaperProvider theme={{...CustomTheme, fonts}}>
          <LoadingSurface text="Chargement en cours..."/>
        </PaperProvider>
      </ApolloProvider>
    );
  }
  
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={{...CustomTheme, fonts}}>
          <NavigationContainer>
            { connected ? <ConnectedLayout /> : <GuestLayout />}
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
  )
}

export default App;
