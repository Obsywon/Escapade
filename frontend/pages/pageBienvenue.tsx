import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainTitle from '../components/MainTitle';
import BasicButton from '../components/forms/BasicButton';

interface PageBienvenueProps {
  navigation: any;
}

const PageBienvenue: React.FC<PageBienvenueProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MainTitle title="Bienvenue" />
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Créer un compte"
          onPress={() => navigation.navigate('InscriptionScreen')}
        />
        <BasicButton
          label="Se connecter"
          onPress={() => navigation.navigate('pageConnexion')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default PageBienvenue;
