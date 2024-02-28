import { View } from 'react-native'
import React from 'react'
import { BottomTabParamList } from '../navigation/TabNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native-paper'
import { useGetUserById } from '../services/User';


type FavoriScreenProps = BottomTabScreenProps<BottomTabParamList, 'Favori'>;


export default function FavoriScreen({}: Readonly<FavoriScreenProps>): JSX.Element {

  const {loading, user, error} = useGetUserById("xmVbwfgKlmdRGvur5kv5hXjQype2");


  return (
    <View>
      <Text>{error?.message}</Text>
    </View>
  )
}