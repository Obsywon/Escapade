import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabParamList } from '../navigation/TabNavigator'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'


type ProfileScreenProps = BottomTabScreenProps<BottomTabParamList, 'Profil'>


export default function ProfileScreen({} : Readonly<ProfileScreenProps>) {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}