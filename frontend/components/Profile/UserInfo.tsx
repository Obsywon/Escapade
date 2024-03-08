import { View, Image, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Text, Caption, Icon, Surface, Title } from "react-native-paper";
import { ColorScheme } from "../../themes/CustomColors";
import { Account } from "../../types/Account";

export type UserInfoProps = {
  containerStyle: StyleProp<ViewStyle>,
  userData: Account
}

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
            <Title style={styles.title}>{userData.name} {userData.lastName}</Title>
            {/*<Caption style={styles.caption}></Caption>*/}
          </View>
        </View>
        { userData?.description ? 
          (<Text style={styles.textePresentation}>
          {userData?.description}
        </Text>)
          : null
        }
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
        { (userData?.phone != null && userData?.phone.length > 0) ??
        (<View style={styles.row}>
          <Icon source="phone" color={ColorScheme.primary} size={20} />
          <Text style={styles.textUser}>{userData?.phone}</Text>
        </View>)
        }
        
        <View style={styles.row}>
          <Icon source="email" color={ColorScheme.primary} size={20} />
          <Text style={styles.textUser}>{userData.email}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: ColorScheme.white
  },
  userInfoSection: {
    marginLeft: 16,
    marginVertical: 8,
    justifyContent: "center",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4
    
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
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
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
    paddingVertical: 16,
    textAlign: "center",
    // fontFamily: "Fontastique",
    color: ColorScheme.primary,
    fontSize: 16,
  },
});
