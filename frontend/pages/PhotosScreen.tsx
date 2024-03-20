import { View } from 'react-native'
import React from 'react'
import { BottomTabParamList } from '../navigation/TabNavigator'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native-paper'


type PhotosScreenProps = BottomTabScreenProps<BottomTabParamList, 'Photos'>

export default function PhotosScreen({}: Readonly<PhotosScreenProps>): JSX.Element {
  return (
    <View>
      <Text>Photos</Text>
    </View>
  )
}