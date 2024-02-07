import React from "react";
import { StyleSheet, View } from "react-native";
import UserInfo from "../components/Profile/UserInfo";
import MenuProfile from "../components/Profile/MenuProfile";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ColorScheme } from "../themes/CustomColors";
import BasicButton from "../components/forms/BasicButton";
import { AppNavigatorParamList } from "../App";

export default function ProfileScreen(): JSX.Element {
  const navigation =
    useNavigation<StackNavigationProp<AppNavigatorParamList>>();

  return (
    <View style={{ flex: 1, justifyContent: 'space-around' }}>
      <UserInfo containerStyle={styles.UserContainer} />
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Modifier le profil"
          onPress={() => navigation.navigate("ModifierProfil")}
          color={ColorScheme.secondary}
        />
      </View>
      <MenuProfile />
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