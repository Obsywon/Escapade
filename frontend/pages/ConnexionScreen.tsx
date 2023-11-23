import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Surface} from 'react-native-paper';
import AppTitle from '../components/AppTitle';
import MainTitle from '../components/MainTitle';
import BasicTextInput from '../components/forms/BasicTextInput';
import PasswordInput from '../components/forms/PasswordInput';
import FormLayout from '../layouts/FormLayout';
import BasicButton from '../components/forms/BasicButton';

export default function ConnexionScreen(): JSX.Element {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  return (
    <FormLayout>
      <Surface style={styles.formContainer} elevation={2}>
        <ScrollView
          maximumZoomScale={1}
          minimumZoomScale={1}
          automaticallyAdjustContentInsets={true}
          automaticallyAdjustsScrollIndicatorInsets={true}
          pagingEnabled={true}
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.titles}>
            <AppTitle title="Escapade" />
            <MainTitle title="Inscription" />
            <BasicTextInput value={email} setValue={setEmail} label="E-mail" />
            <PasswordInput
              value={password}
              setPassword={setPassword}
              label="Mot de passe"
            />
          </View>
          <BasicButton label="Connexion" disabled={true} />
        </ScrollView>
      </Surface>
    </FormLayout>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 0,
  },
  linedInputs: {
    flexDirection: 'row',
    gap: 8,
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
