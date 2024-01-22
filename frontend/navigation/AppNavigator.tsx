import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import pageBienvenue from '../pages/BienvenueScreen';
import InscriptionScreen from '../pages/InscriptionScreen';
import ConnexionScreen from '../pages/ConnexionScreen';
import TabNavigator from './TabNavigator';

export type AppNavigator = {
  Bienvenue: undefined,
  Inscription: undefined,
  Connexion: undefined,
  Accueil: undefined
}

const Stack = createStackNavigator<AppNavigator>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Bienvenue" >
      <Stack.Screen name="Bienvenue" component={pageBienvenue} />
      <Stack.Screen name="Inscription" component={InscriptionScreen} />
      <Stack.Screen name="Connexion" component={ConnexionScreen} />
      <Stack.Screen name="Accueil" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
