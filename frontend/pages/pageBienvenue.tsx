import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MainTitle from '../components/MainTitle';
import BasicButton from '../components/forms/BasicButton';
import FormLayout from '../layouts/FormLayout';
import { Paragraph, Surface } from 'react-native-paper';
import Logo from '../components/forms/Logo';
import AppTitle from '../components/AppTitle';



interface PageBienvenueProps {
  navigation: any;
}

const PageBienvenue: React.FC<PageBienvenueProps> = ({ navigation }) => {
  return (
    <FormLayout>
      <Surface style={styles.formContainer} elevation={2}>
        <ScrollView
          maximumZoomScale={1}
          minimumZoomScale={1}
          automaticallyAdjustContentInsets={true}
          pagingEnabled={true}
          contentContainerStyle={styles.scrollViewContent}>

	  <Logo />

          <View style={styles.titles}>
            <AppTitle title="Escapade" />
            <MainTitle title="Bienvenue" />
          </View> 

	  <Paragraph>
  	     Partez pour une aventure mémorable avec Escapade{"\n"}
  	     Pas encore membre ? Rejoignez-nous maintenant{"\n"}
         Explorez des parcours touristiques uniques !
	  </Paragraph>       
          
          <BasicButton
            label="Créer un compte"
            onPress={() => navigation.navigate('InscriptionScreen')}
          />

          <BasicButton
            label="Se connecter"
            onPress={() => navigation.navigate('ConnexionScreen')}
          />
          
        </ScrollView>
      </Surface>
    </FormLayout>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 0,
  },
  
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
  },
  
});


export default PageBienvenue;
