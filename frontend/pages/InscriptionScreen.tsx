import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Surface} from 'react-native-paper';
import MainTitle from '../components/MainTitle';
import BasicTextInput from '../components/forms/BasicTextInput';
import BasicButton from '../components/forms/BasicButton';
import AppTitle from '../components/AppTitle';
import FormLayout from '../layouts/FormLayout';
import DatePicker from '../components/forms/DatePicker';
import VerifyPassword from '../components/forms/VerifyPassword';
import EmailInput from '../components/forms/EmailInput';

function InscriptionScreen(): JSX.Element {
  const [password, setPassword] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [prenom, setPrenom] = useState<string | undefined>();
  const [nom, setNom] = useState<string | undefined>();
  const [formValid, setFormValid] = useState<boolean>(false);

  useEffect(() => {
    if (
      password == null ||
      email == null ||
      date == null ||
      prenom == null ||
      nom == null ||
      prenom.length < 3 ||
      nom.length < 3 ||
      email.length < 3
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [password, email, date, prenom, nom]);

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
          <EmailInput setActualEmail={setEmail} />
          <VerifyPassword setRealPassword={setPassword} />
          <View style={styles.linedInputs}>
            <BasicTextInput
              value={prenom}
              setValue={setPrenom}
              label="Prénom"
            />
            <BasicTextInput value={nom} setValue={setNom} label="Nom" />
          </View>
          <DatePicker date={date} setDate={setDate} label="Date de naissance" />
          <BasicButton label="Inscription" disabled={!formValid} />
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
