import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import AppTitle from '../components/AppTitle';
import MainTitle from '../components/MainTitle';
import PasswordInput from '../components/forms/PasswordInput';
import FormLayout from '../layouts/FormLayout';
import BasicButton from '../components/forms/BasicButton';
import EmailInput from '../components/forms/EmailInput';
import {useForm} from 'react-hook-form';

type ConnexionFormData = {
  email: string;
  password: string;
};

export default function ConnexionScreen(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ConnexionFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <FormLayout>
      <Surface style={styles.formContainer} elevation={2}>
        <View style={styles.form}>
          <AppTitle title="Escapade" />
          <MainTitle title="Connexion" />
          <EmailInput control={control} name="email" />
          <PasswordInput control={control} name="password" />
          <BasicButton label="Connexion" onPress={onSubmit} />
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
