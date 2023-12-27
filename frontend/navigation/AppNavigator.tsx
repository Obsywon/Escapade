import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import pageBienvenue from '../pages/pageBienvenue';
import InscriptionScreen from '../pages/InscriptionScreen';
import ConnexionScreen from '../pages/ConnexionScreen';
// import pageConnexion from '../pages/pageConnexion';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="pageBienvenue">
        <Stack.Screen name="pageBienvenue" component={pageBienvenue} />
        <Stack.Screen name="InscriptionScreen" component={InscriptionScreen} />
        <Stack.Screen name="ConnexionScreen" component={ConnexionScreen} />
        {/* Ajoutez d'autres écrans ici si nécessaire */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
