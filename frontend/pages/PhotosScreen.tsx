import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabParamList } from '../navigation/TabNavigator'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'


type PhotosScreenProps = BottomTabScreenProps<BottomTabParamList, 'Photos'>

export default function PhotosScreen({}: Readonly<PhotosScreenProps>) {
  return (
    <View>
      <Text>Photos</Text>
    </View>
  )
}