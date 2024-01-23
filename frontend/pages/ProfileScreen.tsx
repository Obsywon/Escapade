import React from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import HeaderProfile from '../components/Profile/HeaderProfile';
import UserInfo from '../components/Profile/UserInfo';

export default function ProfileScreen() {
  
  return (
    <ScrollView>
      <HeaderProfile />
      <UserInfo />

    </ScrollView>
  )
}
