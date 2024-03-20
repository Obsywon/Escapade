import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import UserInfo from "../components/Profile/UserInfo";
import MenuProfile from "../components/Profile/MenuProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { ColorScheme } from "../themes/CustomColors";
import BasicButton from "../components/forms/BasicButton";
import { USER_BY_ID_QUERY, getUserById } from "../service/userService";
import LoadingSurface from "../components/LoadingSurface";
import { firebaseAuth } from "../service/AuthService";
import { ActivityIndicator, Text, Surface } from "react-native-paper";
import { useApolloClient } from "@apollo/client";
import { signOut } from "firebase/auth";
import { AppNavigatorParamList } from "../navigation/RootNavigator";
import { getAllPlace } from "../service/placeService";


type ProfileScreenProps = StackScreenProps<AppNavigatorParamList, "Profil">;

export default function ProfileScreen({ navigation }: Readonly<ProfileScreenProps>): JSX.Element {


  const uid = firebaseAuth.currentUser?.uid;

  const { loading, user, error } = getUserById(uid ?? "")
  const client = useApolloClient();

  async function disconnect(): Promise<void> {
    await signOut(firebaseAuth);
  }

  useEffect(() => {
    // Recharge les dernières infos du profil
    navigation.addListener('focus', () => {
      (async () => {
        await client.refetchQueries({
          include: [USER_BY_ID_QUERY]
        })
      })();
    });
  }, [navigation]);


  if (!uid) {
    return (
      <LoadingSurface />
    )
  }


  if (error) {
    return (
      <View>
        <Text>{error?.message}</Text>
      </View>
    )
  }

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
          onPress={() => navigation.push("ModifierProfil")}
          color={ColorScheme.secondary}
          disabled={loading}
        />
      </View>
      <MenuProfile />
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Se déconnecter"
          onPress={disconnect}
          color={ColorScheme.secondary}
          disabled={loading}
        />
      </View>
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