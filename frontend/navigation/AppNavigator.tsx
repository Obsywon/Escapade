import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InscriptionScreen from '../pages/InscriptionScreen';
import ConnexionScreen from '../pages/ConnexionScreen';
import TabNavigator from './TabNavigator';
import BienvenueScreen from '../pages/BienvenueScreen';
import EditProfileScreen from '../pages/EditProfileScreen';

export type AppNavigatorParamList = {
  Bienvenue: undefined,
  Inscription: undefined,
  Connexion: undefined,
  Dashboard: {token: string},
  ModifierProfil: undefined,
}

const Stack = createStackNavigator<AppNavigatorParamList>();

const AppNavigator = (): JSX.Element => {


  return (
    <Stack.Navigator initialRouteName="Bienvenue" >
      <Stack.Screen name="Bienvenue" component={BienvenueScreen} />
      <Stack.Screen name="Inscription" component={InscriptionScreen} />
      <Stack.Screen name="Connexion" component={ConnexionScreen} />
      <Stack.Screen name="ModifierProfil" component={EditProfileScreen} />
      <Stack.Screen name="Dashboard" component={TabNavigator} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;
