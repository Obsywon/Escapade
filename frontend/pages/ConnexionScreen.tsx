import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import AppTitle from '../components/AppTitle';
import MainTitle from '../components/MainTitle';
import PasswordInput from '../components/forms/PasswordInput';
import FormLayout from '../layouts/FormLayout';
import BasicButton from '../components/forms/BasicButton';
import useEmailInput from '../hooks/useEmailInput';
import EmailInput from '../components/forms/EmailInput';

export default function ConnexionScreen(): JSX.Element {
  const [password, setPassword] = useState<string | undefined>();
  const [sendable, setSendable] = useState<boolean>(false);
  const [email, setEmail, errorMessage, emailIsValid] = useEmailInput();

  function resetForm(): void {
    setPassword(undefined);
    setEmail('');
  }

  function sendForm(): void {
    resetForm();
  }

  useEffect(() => {
    // Test validité mot de passe (longueur uniquement)
    let canSend: boolean; // = password != null && password.length >= 8;

    // Test e-mail
    //canSend = canSend && emailIsValid;
    canSend = emailIsValid;
    setSendable(canSend);
  }, [emailIsValid, password]);

  return (
    <FormLayout>
      <Surface style={styles.formContainer} elevation={2}>
        <View style={styles.form}>
          <AppTitle title="Escapade" />
          <MainTitle title="Inscription" />

          <EmailInput
            email={email}
            setEmail={setEmail}
            isValid={email.length === 0 || emailIsValid}
            errorMsg={errorMessage}
          />
          <PasswordInput
            value={password}
            setPassword={setPassword}
            label="Mot de passe"
            isValid={
              //password == null || password.length === 0 || password.length >= 8
              true
            }
          />
          <BasicButton
            label="Connexion"
            disabled={!sendable}
            onPress={sendForm}
          />
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
    height: '80%',
    minHeight: '60%',
    paddingHorizontal: 24,
  },
});
