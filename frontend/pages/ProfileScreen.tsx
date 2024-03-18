import React from "react";
import { StyleSheet, View } from "react-native";
import UserInfo from "../components/Profile/UserInfo";
import MenuProfile from "../components/Profile/MenuProfile";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ColorScheme } from "../themes/CustomColors";
import BasicButton from "../components/forms/BasicButton";
import { AppNavigatorParamList } from "../App";
import { getUserById } from "../services/userService";
import LoadingSurface from "../components/LoadingSurface";
import { firebaseAuth } from "../services/AuthService";
import { ActivityIndicator, Text, Surface } from "react-native-paper";
import useFirebaseAuth from "../hooks/useFirebaseAuth";


export default function ProfileScreen(): JSX.Element {
  const navigation = useNavigation<StackNavigationProp<AppNavigatorParamList>>();

  const { disconnectUserFromFirebase } = useFirebaseAuth();

  const uid = firebaseAuth.currentUser?.uid;

  const handleLogout = async () => {
    await disconnectUserFromFirebase();
    navigation.replace("Connexion");
  };

  if (!uid) {
    navigation.replace("Connexion");
    return (
      <LoadingSurface />
    )
  }

  const { loading, user, error } = getUserById(uid)


  return (
    <View style={{ flex: 1, justifyContent: 'space-around' }}>
      {
        loading ?
          (<Surface style={styles.UserContainer}>
            <ActivityIndicator />
            <Text variant="bodyLarge">Chargement en cours...</Text>
          </Surface>)
          :
          (<UserInfo containerStyle={styles.UserContainer} userData={user} />)
      }

      <View style={styles.buttonContainer}>
        <BasicButton
          label="Modifier le profil"
          onPress={() => navigation.push("ModifierProfil", {uid})}
          color={ColorScheme.secondary}
          disabled={loading}
        />
      </View>
      <MenuProfile />
      
      <BasicButton
          label="Se déconnecter"
          onPress={handleLogout}
          color={ColorScheme.secondary}
          disabled={loading}
        />
    </View>
  );
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
});