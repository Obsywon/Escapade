import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Surface} from 'react-native-paper';
import MainTitle from '../components/MainTitle';
import BasicTextInput from '../components/forms/BasicTextInput';
import BasicButton from '../components/forms/BasicButton';
import AppTitle from '../components/AppTitle';
import FormLayout from '../layouts/FormLayout';
import DatePicker from '../components/forms/DatePicker';
import EmailInput from '../components/forms/EmailInput';
import useVerifiedPasswordInputs from '../hooks/useVerifiedPasswordInputs';
import PasswordInput from '../components/forms/PasswordInput';
import ErrorText from '../components/forms/ErrorText';
import useEmailInput from '../hooks/useEmailInput';
import {useInscription} from './UserService/useInscription';

function InscriptionScreen(): JSX.Element {
  const [
    password,
    secondPassword,
    setPassword,
    setSecondPassword,
    passwordErrorMessage,
    passwordIsVerified,
  ] = useVerifiedPasswordInputs();

  const [email, setEmail, errorMessage, emailIsValid] = useEmailInput();

  const [date, setDate] = useState<Date | undefined>();
  const [prenom, setPrenom] = useState<string | undefined>();
  const [nom, setNom] = useState<string | undefined>();
  const [formValid, setFormValid] = useState<boolean>(false);

  const [inscription, data, error, loading] = useInscription();

  async function sendData(): Promise<any> {
    await inscription({
      email,
      nom: nom != null ? nom : '',
      prenom: prenom != null ? prenom : '',
      mot_de_passe: password.value,
      date_de_naissance: date != null ? date : '',
      genre: 'male',
    });
    console.log(data);
  }

  useEffect(() => {
    if (
      !passwordIsVerified ||
      !emailIsValid ||
      date == null ||
      prenom == null ||
      nom == null ||
      prenom.length < 3 ||
      nom.length < 3
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passwordIsVerified, emailIsValid, date, prenom, nom]);

  return (
    <FormLayout>
      <Surface style={styles.formContainer} elevation={2}>
        <ScrollView
          maximumZoomScale={1}
          minimumZoomScale={1}
          automaticallyAdjustContentInsets={true}
          pagingEnabled={true}
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.titles}>
            <AppTitle title="Escapade" />
            <MainTitle title="Inscription" />
          </View>
          <EmailInput
            setEmail={setEmail}
            email={email}
            errorMsg={errorMessage}
            isValid={email.length === 0 ? true : emailIsValid}
          />
          <PasswordInput
            label="Mot de passe"
            value={password.value}
            setPassword={setPassword}
            isValid={password.isValid}
          />
          <PasswordInput
            label="Vérification mot de passe"
            value={secondPassword.value}
            setPassword={setSecondPassword}
            isValid={secondPassword.isValid}
          />

          {passwordErrorMessage != null && (
            <ErrorText>{passwordErrorMessage}</ErrorText>
          )}
          <View style={styles.linedInputs}>
            <BasicTextInput
              value={prenom}
              setValue={setPrenom}
              label="Prénom"
            />
            <BasicTextInput value={nom} setValue={setNom} label="Nom" />
          </View>
          {nom != null && nom.length < 3 ? (
            <ErrorText>Le nom doit fait au moins 3 caractères.</ErrorText>
          ) : null}
          {prenom != null && prenom.length < 3 ? (
            <ErrorText>Le prénom doit fait au moins 3 caractères.</ErrorText>
          ) : null}
          <DatePicker date={date} setDate={setDate} label="Date de naissance" />
          <BasicButton
            label="Inscription"
            disabled={!formValid || loading}
            onPress={sendData}
            loading={loading}
          />
          {error != null && error.length > 0 ? (
            <ErrorText>{error}</ErrorText>
          ) : null}
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
