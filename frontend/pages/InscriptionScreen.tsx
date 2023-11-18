import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
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
        <AppTitle title="Escapade" />
        <MainTitle title="Inscription" />
        <BasicTextInput value={email} setValue={setEmail} label="E-mail" />
        <PasswordInput value={password} setPassword={setPassword} />
        <BasicButton label="Inscription" />
      </Surface>
    </FormLayout>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 24,
    paddingTop: 72,
    paddingBottom: 72,
  },
});

export default InscriptionScreen;
