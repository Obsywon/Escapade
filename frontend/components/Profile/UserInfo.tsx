import { View, Image, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Caption, Icon, Surface, Title } from "react-native-paper";
import { ColorScheme } from "../../themes/CustomColors";
import { Text } from "react-native-paper";

export type UserInfoProps = {
  containerStyle: StyleProp<ViewStyle>;
  userData?: any; //pour le moment
};

export default function UserInfo({ containerStyle, userData }: UserInfoProps) {
  return (
    <Surface mode="elevated" style={containerStyle}>
      <View style={styles.containerHeader}>
        <View style={styles.userInfo}>
          <Image
            source={require("./../../assets/user.png")}
            style={styles.userImage}
          />
          <View style={styles.userName}>
            <Title style={styles.title}>Harry Potter</Title>
            <Caption style={styles.caption}>Griffondor</Caption>
          </View>
        </View>
        <Text style={styles.textePresentation}>
          J'aime la magie, les mystères et partir à la découverte
        </Text>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon
            source="map-marker-radius"
            color={ColorScheme.primary}
            size={24}
          />
          <Text style={styles.textUser}>London, UK</Text>
        </View>
        <View style={styles.row}>
          <Icon source="phone" color={ColorScheme.primary} size={16} />
          <Text style={styles.textUser}>+44-900000009</Text>
        </View>
        <View style={styles.row}>
          <Icon source="email" color={ColorScheme.primary} size={16} />
          <Text style={styles.textUser}>harry_potter@gmail.com</Text>
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  containerProfil: {
    marginHorizontal: 16,
    padding: 16,
    marginVertical: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: ColorScheme.white,
  },
  userInfoSection: {
    marginLeft: 16,
    marginTop: 16,
    justifyContent: "center",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 8,
  },
  textUser: {
    color: ColorScheme.secondary,
    marginLeft: 8,
  },

  containerHeader: {
    // flex: 1,
  },
  titleContainer: {
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "center",
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 96,
  },
  userName: {
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorScheme.primary,
    // fontFamily: "Fontastique",
  },
  caption: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "500",
    color: ColorScheme.secondary,
    // fontFamily: "Fontastique",
  },
  textePresentation: {
    marginTop: 8,
    textAlign: "center",
    // fontFamily: "Fontastique",
    color: ColorScheme.primary,
    fontSize: 16,
  },
});
