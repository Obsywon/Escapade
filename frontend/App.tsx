
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import GuestLayout from './layouts/GuestLayout';
import ConnectedLayout from './layouts/ConnectedLayout';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import pageBienvenue from './pages/pageBienvenue';
import InscriptionScreen from './pages/InscriptionScreen';
import {CustomTheme} from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

const Stack = createNativeStackNavigator();

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://escapadeapi20240115214733.azurewebsites.net/graphql/',
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
            {connected ? (
              <ConnectedLayout />
            ) : (
              <Stack.Navigator initialRouteName="pageBienvenue">
                <Stack.Screen name="pageBienvenue" component={pageBienvenue} />
                <Stack.Screen name="InscriptionScreen" component={InscriptionScreen} />
                {/* <Stack.Screen name="pageConnexion" component={pageConnexion} /> */}
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
  );

export default App;


