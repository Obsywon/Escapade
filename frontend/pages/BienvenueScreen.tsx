import React from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import MainTitle from "../components/MainTitle";
import BasicButton from "../components/forms/BasicButton";
import { Text, Surface } from "react-native-paper";
import Logo from "../components/forms/Logo";
import AppTitle from "../components/AppTitle";
import { ColorScheme } from "../themes/CustomColors";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorParamList } from "../App";

type BienvenueScreenProps = StackNavigationProp<AppNavigatorParamList, 'Bienvenue'>

const BienvenueScreen = () : JSX.Element => {

  const navigation = useNavigation<StackNavigationProp<AppNavigatorParamList>>();
  
  return (
    <ImageBackground
      resizeMode={"stretch"}
      style={{ flex: 1 }}
      source={require("../assets/parcours.png")}
    >
      <ScrollView
        maximumZoomScale={1}
        minimumZoomScale={1}
        automaticallyAdjustContentInsets={true}
        pagingEnabled={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Surface
          mode="flat"
          style={{
            marginVertical: 8,
            marginHorizontal: 24,
            padding: 16,
            borderRadius: 32,
            backgroundColor: "rgba(255,255,255,0.85)",
          }}
        >
          <View style={styles.titles}>
            <AppTitle title="Escapade" />
            <Logo />
            <MainTitle title="Bienvenue" />
          </View>

          <Text style={styles.text}>
            Partez pour une aventure mémorable avec Escapade{"\n"}
            Pas encore membre ? Rejoignez-nous maintenant{"\n"}
            Explorez des parcours touristiques uniques !
          </Text>
        </Surface>

        <Surface
          mode="flat"
          style={{
            backgroundColor: "rgba(255,255,255,0)",
          }}
        >
          <View style={styles.buttonContainer}>
            <BasicButton
              label="Créer un compte"
              onPress={() => navigation.navigate("Inscription")}
              color={ColorScheme.secondary}
            />
          </View>

          <View style={styles.buttonContainer}>
            <BasicButton
              label="Se connecter"
              onPress={() => navigation.navigate("Connexion")}
            />
          </View>
        </Surface>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollViewContent: {
    justifyContent: 'space-around',
    padding: 8,
    paddingRight: 24,
    paddingLeft: 24,
  },
  titles: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: ColorScheme.primary,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default BienvenueScreen;
