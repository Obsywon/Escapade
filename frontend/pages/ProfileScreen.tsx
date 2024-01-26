import React from 'react';
import {ScrollView} from 'react-native';
import HeaderProfile from '../components/Profile/HeaderProfile';
import UserInfo from '../components/Profile/UserInfo';
import MenuProfile from '../components/Profile/MenuProfile';
import EditProfileButton from '../components/Profile/EditProfileButton';
import { useNavigation } from '@react-navigation/native';
import { BottomTabParamList } from '../navigation/TabNavigator'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'


type ProfileScreenProps = BottomTabScreenProps<BottomTabParamList, 'Profil'>


export default function ProfileScreen({} : Readonly<ProfileScreenProps>): JSX.Element {

  const navigation = useNavigation();
  
  return (
    <ScrollView>
      <HeaderProfile />
      <UserInfo />
      <EditProfileButton navigation={navigation} />
      <MenuProfile />

    </ScrollView>
  )
}
