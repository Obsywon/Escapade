import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DashboardScreen from '../pages/DashboardScreen';
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


type IconProps = {
  color: string,
  size: number,
};

type TabElement = {
  label: keyof BottomTabParamList,
  component: (T: any)=> JSX.Element,
  iconComponent?: ({color, size}: IconProps) => JSX.Element
};

const tabs : TabElement[] = [
  {
    label: 'Accueil',
    component: DashboardScreen,
    iconComponent: ({ color, size }: IconProps) => (
      <Ionicons name='home' color={color} size={size} />
    ),
  },
  {
    label: 'Recherche',
    component: RechercheScreen,
    iconComponent: ({ color, size }: IconProps) => (
      <Ionicons name='search' color={color} size={size} />
    ),
  },
  {
    label: 'Favori',
    component: FavoriScreen,
    iconComponent: ({ color, size }: IconProps) => (
      <Ionicons name='ios-heart' color={color} size={size} />
    ),
  },
  {
    label: 'Photos',
    component: PhotosScreen,
    iconComponent: ({ color, size }: IconProps) => (
      <FontAwesome name='photo' color={color} size={size} />
    ),
  },{
    label: 'Profil',
    component: ProfileScreen,
    iconComponent: ({ color, size }: IconProps) => (
      <FontAwesome name='user-circle-o' color={color} size={size} />
    ),
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
            tabBarIcon: tab.iconComponent,
          }} />
        ))}
    </Tab.Navigator>
  )
}

