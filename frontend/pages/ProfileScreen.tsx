import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import HeaderProfile from "../components/Profile/HeaderProfile";
import UserInfo from "../components/Profile/UserInfo";
import MenuProfile from "../components/Profile/MenuProfile";
import EditProfileButton from "../components/Profile/EditProfileButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamList } from "../navigation/AppNavigator";
import { Surface } from "react-native-paper";
import { ColorScheme } from "../themes/CustomColors";

export default function ProfileScreen(): JSX.Element {
  const navigation =
    useNavigation<StackNavigationProp<AppNavigatorParamList>>();

  return (
    <ScrollView>
      <UserInfo containerStyle={styles.UserContainer} />
      <EditProfileButton
        onPress={() => navigation.navigate("ModifierProfil")}
      />
      <MenuProfile />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  UserContainer: {
    marginHorizontal: 16,
    padding: 16,
    marginVertical: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: ColorScheme.white,
  },
});
