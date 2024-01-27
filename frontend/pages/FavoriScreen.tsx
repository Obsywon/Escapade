import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabParamList } from '../navigation/TabNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


type FavoriScreenProps = BottomTabScreenProps<BottomTabParamList, 'Favori'>;


export default function FavoriScreen({}: Readonly<FavoriScreenProps>): JSX.Element {
  return (
    <View>
      <Text>Favori</Text>
    </View>
  )
}