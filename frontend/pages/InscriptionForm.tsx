import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import MainTitle from '../components/MainTitle';
import PasswordInput from '../components/PasswordInput';
import BasicTextInput from '../components/BasicTextInput';
import BasicButton from '../components/BasicButton';
import AppTitle from '../components/AppTitle';

function InscriptionForm(): JSX.Element {
  const [password, setPassword] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  return (
    <Surface style={styles.container} elevation={2}>
      <View style={styles.formContainer}>
      <AppTitle title="Escapade" />
        <MainTitle title="Inscription" />
        <BasicTextInput value={email} setValue={setEmail} label="E-mail" />
        <PasswordInput value={password} setPassword={setPassword} />
        <BasicButton label="Inscription" />
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 16,
    padding: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 72,
    paddingBottom: 72,
  },
});

export default InscriptionForm;
