import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { Surface, Text } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack';
import { getUserById } from '../service/userService';
import { ColorScheme, CustomColors } from '../themes/CustomColors';
import { Account } from '../types/Account';
import EditProfileForm from '../components/EditProfile/EditProfileForm';
import { AppNavigatorParamList } from '../navigation/RootNavigator';
import { firebaseAuth } from '../service/AuthService';


type ModifierProfilScreenProps = StackScreenProps<AppNavigatorParamList, 'ModifierProfil'>

export default function EditProfileScreen({ navigation, route }: Readonly<ModifierProfilScreenProps>) :  JSX.Element {
  const uid = firebaseAuth.currentUser?.uid;
  const { loading, error, user } = getUserById(uid ?? "");
  const userData = user as Account;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <Surface style={styles.UserContainer}>
          <ActivityIndicator />
          <Text variant="bodyLarge">Chargement de vos données en cours...</Text>
        </Surface>
      </View>
    )
  }

  if (error){
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <Surface style={styles.UserContainer}>
          <ActivityIndicator />
          <Text variant="bodyLarge">Une erreur est survenue. Veuillez relancer l'application.</Text>
        </Surface>
      </View>
    )
  }

  

  return (
    <View style={{ flex: 1}}>
        <Text variant='headlineLarge' style={styles.titles}>Modifier votre profil</Text>
      <EditProfileForm userData={userData}></EditProfileForm>
    </View>
  )
}

const styles = StyleSheet.create({
  UserContainer: {
    marginHorizontal: 16,
    padding: 16,
    marginVertical: 16,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: ColorScheme.white,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    marginHorizontal: '25%',
  },
  titles: {
    padding: 16,
    textAlign: 'center',
    alignSelf: 'center',
    color: CustomColors.MainTitleColor,
  },
});