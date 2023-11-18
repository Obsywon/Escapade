import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Keyboard} from 'react-native';
import {Surface} from 'react-native-paper';
import MainTitle from '../components/MainTitle';
import PasswordInput from '../components/PasswordInput';
import BasicTextInput from '../components/BasicTextInput';
import BasicButton from '../components/BasicButton';
import AppTitle from '../components/AppTitle';
import FormLayout from '../layouts/FormLayout';

function InscriptionScreen(): JSX.Element {
  const [password, setPassword] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  return (
    <FormLayout>
      <Surface style={styles.formContainer} elevation={2}>
        <View style={styles.titles}>
          <AppTitle title="Escapade" />
          <MainTitle title="Inscription" />
        </View>
        <ScrollView
          maximumZoomScale={1}
          minimumZoomScale={1}
          automaticallyAdjustContentInsets={true}
          pagingEnabled={true}
          contentContainerStyle={styles.scrollViewContent}>
          <BasicTextInput value={email} setValue={setEmail} label="E-mail" />
          <PasswordInput value={password} setPassword={setPassword} />
          <PasswordInput
            label="Vérification mot de passe"
            value={password}
            setPassword={setPassword}
          />
          <View style={styles.linedInputs}>
            <BasicTextInput value={email} setValue={setEmail} label="Prénom" />
            <BasicTextInput value={email} setValue={setEmail} label="Nom" />
          </View>
          <BasicButton label="Inscription" disabled={true} />
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

export default InscriptionScreen;
