import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AccueilScreen from '../pages/AccueilScreen';
import { ColorScheme } from '../themes/CustomColors';
import FavoriScreen from '../pages/FavoriScreen';
import PhotosScreen from '../pages/PhotosScreen';
import RechercheScreen from '../pages/RechercheScreen';
import ProfileScreen from '../pages/ProfileScreen';


export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
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
      <Tab.Screen name="Recherche" component={RechercheScreen}
        options={{
          tabBarLabel: 'Recherche',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='search' color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Favori" component={FavoriScreen}
        options={{
          tabBarLabel: 'Favori',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='ios-heart' color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Album" component={PhotosScreen}
        options={{
          tabBarLabel: 'Album',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='photo' color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Profil" component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user-circle-o' color={color} size={size} />
          )
        }} />
    </Tab.Navigator>
  )
}