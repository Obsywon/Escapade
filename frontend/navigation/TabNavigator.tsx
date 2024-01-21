import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from '../pages/Accueil';
import Recherche from '../pages/Recherche';
import Favori from '../pages/Favori';
import Photos from '../pages/Photos';
import Profile from '../pages/Profile';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accueil" component={Accueil} 
      options={{
        tabBarLabel: 'Accuei',
        tabBarIcon: ({color, size}) => (
            <Ionicons name='home' color={color} size={size} />
        )
      }}/>
      <Tab.Screen name="Recherche" component={Recherche} 
      options={{
        tabBarLabel: 'Recherche',
        tabBarIcon: ({color, size}) => (
            <Ionicons name='search' color={color} size={size} />
        )
      }}/>
      <Tab.Screen name="Favori" component={Favori} 
      options={{
        tabBarLabel: 'Favori',
        tabBarIcon: ({color, size}) => (
            <Ionicons name='ios-heart' color={color} size={size} />
        )
      }}/>
      <Tab.Screen name="Photos" component={Photos} 
      options={{
        tabBarLabel: 'Photos',
        tabBarIcon: ({color, size}) => (
            <FontAwesome name='photo' color={color} size={size} />
        )
      }}/>
      <Tab.Screen name="Profil" component={Profile} 
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color, size}) => (
            <FontAwesome name='user-circle-o' color={color} size={size} />
        )
      }}/>
    </Tab.Navigator>
  )
}