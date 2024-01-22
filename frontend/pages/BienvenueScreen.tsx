import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import MainTitle from '../components/MainTitle';
import BasicButton from '../components/forms/BasicButton';
import FormLayout from '../layouts/FormLayout';
import { Text, Surface } from 'react-native-paper';
import Logo from '../components/forms/Logo';
import AppTitle from '../components/AppTitle';
import { ColorScheme, CustomColors } from '../themes/CustomColors';



interface BienvenueScreenProps {
  navigation: any;
}

const BienvenueScreen: React.FC<BienvenueScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      resizeMode={'stretch'}
      style={{ flex: 1 }}
      source={require('../assets/parcours.png')}>
      <ScrollView
        maximumZoomScale={1}
        minimumZoomScale={1}
        automaticallyAdjustContentInsets={true}
        pagingEnabled={true}
        contentContainerStyle={styles.scrollViewContent}>

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

        <View style={styles.buttonContainer}>
          <BasicButton
            label="Créer un compte"
            onPress={() => navigation.navigate('Inscription')}
            color={ColorScheme.secondary}
          />
        </View>

        <View style={styles.buttonContainer}>
          <BasicButton
            label="Se connecter"
            onPress={() => navigation.navigate('Connexion')}
          />
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollViewContent: {
    padding: 8,
    paddingRight: 24,
    paddingLeft: 24,
  },
  titles: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: ColorScheme.primary,
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default BienvenueScreen;
