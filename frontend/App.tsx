import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import GuestLayout from './layouts/GuestLayout';
import ConnectedLayout from './layouts/ConnectedLayout';
import pageBienvenue from './pages/pageBienvenue';
import InscriptionScreen from './pages/InscriptionScreen';


const Stack = createNativeStackNavigator();

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

    fetchData();
  }, []);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  return (
    <PaperProvider>
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
  );
};

export default App;
