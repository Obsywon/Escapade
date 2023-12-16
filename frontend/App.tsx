
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import GuestLayout from './layouts/GuestLayout';
import ConnectedLayout from './layouts/ConnectedLayout';
import { NavigationContainer } from "@react-navigation/native";
import {
  ActivityIndicator,
  configureFonts,
  PaperProvider,
  Surface,
  Text,
} from "react-native-paper";
import { CustomTheme } from "./themes/CustomTheme";
import { useFonts } from "expo-font";
import useCustomFonts from "./hooks/useCustomFonts";
import { StyleSheet } from "react-native";
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
        <PaperProvider theme={CustomTheme}>
          <LoadingSurface text="Chargement en cours..."/>
        </PaperProvider>
      </ApolloProvider>
    );
  }
  
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
          <NavigationContainer>
            { connected ? <ConnectedLayout /> : <GuestLayout />}
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
  )
}

export default App;
