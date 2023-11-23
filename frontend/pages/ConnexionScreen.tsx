import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
  const [sendable, setSendable] = useState<boolean>(false);

  useEffect(() => {
    let canSend: boolean = false;
    if (password != null && password.length >= 8) {
      canSend = true;
    }

    setSendable(canSend);
  }, [email, password]);

  return (
    <FormLayout>
      <Surface style={styles.formContainer} elevation={2}>
        <View style={styles.form}>
          <AppTitle title="Escapade" />
          <MainTitle title="Inscription" />

          <BasicTextInput value={email} setValue={setEmail} label="E-mail" />
          <PasswordInput
            value={password}
            setPassword={setPassword}
            label="Mot de passe"
          />
          <BasicButton label="Connexion" disabled={!sendable} />
        </View>
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
  form: {
    height: '70%',
    minHeight: '60%',
    paddingHorizontal: 24,
  },
});
