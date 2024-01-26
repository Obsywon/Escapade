import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import AccueilScreen from '../pages/AccueilScreen';
import { ColorScheme } from '../themes/CustomColors';


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
    component: Recherche,
    icon: 'search',
  },
  {
    label: 'Favori',
    component: Favori,
    icon: 'ios-heart'
  },
  {
    label: 'Photos',
    component: Photos,
    icon: 'photo'
  },{
    label: 'Profil',
    component: Profile,
    icon: 'user-circle-o'
  }
]



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