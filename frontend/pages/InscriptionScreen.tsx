import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Surface} from 'react-native-paper';
import MainTitle from '../components/MainTitle';
import BasicTextInput from '../components/forms/BasicTextInput';
import BasicButton from '../components/forms/BasicButton';
import AppTitle from '../components/AppTitle';
import FormLayout from '../layouts/FormLayout';
import DatePicker from '../components/forms/DatePicker';
import EmailInput from '../components/forms/EmailInput';
import PasswordInput from '../components/forms/PasswordInput';
import ErrorText from '../components/forms/ErrorText';
import {useForm} from 'react-hook-form';
import { UserInCreation, useInscription } from '../hooks/useInscription';


import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { lastNameRules, nameRules } from '../service/formRules';
import { AppNavigatorParamList } from '../navigation/RootNavigator';

type InscriptionFormData = {
  nom: string;
  prenom: string;
  mot_de_passe: string;
  date_de_naissance?: Date;
  email: string;
  verify_mdp: string;
};

type InscriptionScreenProps = StackScreenProps<AppNavigatorParamList, 'Inscription'>;

const defaultValues: InscriptionFormData = {
  nom: '',
  prenom: '',
  mot_de_passe: '',
  email: '',
  verify_mdp: '',
};


export default function InscriptionScreen({navigation}: Readonly<InscriptionScreenProps>): JSX.Element {
  const [date, setDate] = useState<Date>();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm<InscriptionFormData>({
    defaultValues: defaultValues,
  });


  const password = watch('mot_de_passe');


  const [inscription, data, error, loading] = useInscription();
  const submit = handleSubmit(async (values: InscriptionFormData) => {
    const user: UserInCreation = {
      email: values.email,
      mot_de_passe: values.mot_de_passe,
      prenom: values.prenom,
      nom: values.nom,
      date_de_naissance: date!,
    };

    //console.log(values);
    //window.alert(date);

    await inscription(user);
    //console.log("INSCRIPTION:", data);
    if (!loading && !error) {
      reset(defaultValues);
      setDate(undefined);
      navigation.navigate('Bienvenue');
    }
  });


  return (
    <FormLayout>
      <Surface style={styles.formContainer} elevation={1}>
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
          <EmailInput control={control} name="email" />
          <PasswordInput control={control} name="mot_de_passe" />
          <PasswordInput
            control={control}
            name="verify_mdp"
            label="Vérification mot de passe"
            rules={{
              required: true,
              validate: {
                isIdentical: v =>
                  v === password || 'Les champs ne sont pas identiques.',
              },
            }}
          />
          <View style={styles.linedInputs}>
            <BasicTextInput
              control={control}
              name="prenom"
              label="Prénom"
              rules={nameRules}
            />
            <BasicTextInput
              control={control}
              name="nom"
              label="Nom"
              rules={lastNameRules}
            />
          </View>
          <DatePicker date={date} setDate={setDate} label="Date de naissance"/>

          <BasicButton
            label="Inscription"
            disabled={loading}
            loading={loading}
            onPress={submit}
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
  scrollViewContent: {
    padding: 8,
    paddingRight: 24,
    paddingLeft: 24,
  },
  titles: {
    flex: 1,
  },
});