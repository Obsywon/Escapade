import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabParamList } from '../navigation/TabNavigator'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'


type RechercheScreenProps = BottomTabScreenProps<BottomTabParamList, 'Recherche'>


export default function RechercheScreen(): JSX.Element {
  return (
    <View>
      <Text>Recherche</Text>
    </View>
  )
}