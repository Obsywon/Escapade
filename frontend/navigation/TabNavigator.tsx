import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import AccueilScreen from '../pages/AccueilScreen';
import { ColorScheme } from '../themes/CustomColors';
import RechercheScreen from '../pages/RechercheScreen';
import FavoriScreen from '../pages/FavoriScreen';
import PhotosScreen from '../pages/PhotosScreen';
import ProfileScreen from '../pages/ProfileScreen';


export type BottomTabParamList = {
  Accueil: undefined;
  Recherche: undefined;
  Favori: undefined;
  Photos: undefined;
  Profil: undefined;
};

type TabElement = {
  label: keyof BottomTabParamList,
  component: (T: any)=> JSX.Element,
  icon: 'home' | 'search' | 'ios-heart' | 'photo' |'user-circle-o',
};

const tabs : TabElement[] = [
  {
    label: 'Accueil',
    component: AccueilScreen,
    icon: 'home',
  },
  {
    label: 'Recherche',
    component: RechercheScreen,
    icon: 'search',
  },
  {
    label: 'Favori',
    component: FavoriScreen,
    icon: 'search'
  },
  {
    label: 'Photos',
    component: PhotosScreen,
    icon: 'search'
  },{
    label: 'Profil',
    component: ProfileScreen,
    icon: 'search'
  }
]



export default function TabNavigator(): JSX.Element {
  const Tab = createBottomTabNavigator<BottomTabParamList>();


  return (
    <Tab.Navigator
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: ColorScheme.secondary,
        tabBarInactiveTintColor: ColorScheme.primary,
      }}
       >
        {tabs.map(tab =>(
          <Tab.Screen key={tab.label} name={tab.label} component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} color={color} size={size} />
            )
          }} />
        ))}
    </Tab.Navigator>
  )
}