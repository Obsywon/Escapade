import { View } from 'react-native'
import React from 'react'
import { BottomTabParamList } from '../navigation/TabNavigator'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native-paper'


type AjoutScreenProps = BottomTabScreenProps<BottomTabParamList, 'Ajout'>


export default function AjoutScreen(): JSX.Element {
  return (
    <View>
      <Text>Ajout</Text>
    </View>
  )
}