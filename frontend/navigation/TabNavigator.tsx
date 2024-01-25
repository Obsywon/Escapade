import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Recherche from '../pages/RechercheScreen';
import Favori from '../pages/FavoriScreen';
import Photos from '../pages/PhotosScreen';
import Profile from '../pages/ProfileScreen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AccueilScreen from '../pages/AccueilScreen';
import { ColorScheme } from '../themes/CustomColors';


export type BottomTabParamList = {
  Accueil: undefined;
  Rercherche: undefined;
  Favori: undefined;
  Photos: undefined;
  Profil: undefined;
};



export default function TabNavigator() {
  const Tab = createBottomTabNavigator<BottomTabParamList>();
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: ColorScheme.secondary,
        tabBarInactiveTintColor: ColorScheme.primary,
      }}
       >
      <Tab.Screen name="Accueil" component={AccueilScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Recherche" component={Recherche}
        options={{
          tabBarLabel: 'Recherche',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='search' color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Favori" component={Favori}
        options={{
          tabBarLabel: 'Favori',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='ios-heart' color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Photos" component={Photos}
        options={{
          tabBarLabel: 'Photos',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='photo' color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Profil" component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user-circle-o' color={color} size={size} />
          )
        }} />
    </Tab.Navigator>
  )
}