import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import pageBienvenue from '../pages/Bienvenue';
import InscriptionScreen from '../pages/InscriptionScreen';
import ConnexionScreen from '../pages/ConnexionScreen';
// import pageConnexion from '../pages/pageConnexion';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="pageBienvenue">
        <Stack.Screen name="Bienvenue" component={pageBienvenue} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} />
        <Stack.Screen name="Connexion" component={ConnexionScreen} />
        {/* Ajoutez d'autres écrans ici si nécessaire */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
