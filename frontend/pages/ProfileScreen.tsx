import React from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import HeaderProfile from '../components/Profile/HeaderProfile';
import UserInfo from '../components/Profile/UserInfo';
import MenuProfile from '../components/Profile/MenuProfile';
import EditProfileButton from '../components/Profile/EditProfileButton';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {

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
