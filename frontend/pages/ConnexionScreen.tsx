import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";
import AppTitle from "../components/AppTitle";
import MainTitle from "../components/MainTitle";
import PasswordInput from "../components/forms/PasswordInput";
import FormLayout from "../layouts/FormLayout";
import BasicButton from "../components/forms/BasicButton";
import EmailInput from "../components/forms/EmailInput";
import { useForm } from "react-hook-form";

type ConnexionFormData = {
  email: string;
  password: string;
};

export default function ConnexionScreen(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnexionFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <FormLayout>
      <Surface style={styles.formContainer} elevation={1}>
          <View style={styles.titles}>
            <AppTitle title="Escapade" />
            <MainTitle title="Connexion" />
          </View>
          <View style={styles.content}>
            <View style={styles.formContent}>
              <EmailInput control={control} name="email" />
              <PasswordInput control={control} name="password" />
              <BasicButton label="Connexion" onPress={onSubmit} />
            </View>
          </View>
      </Surface>
    </FormLayout>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'red',
  },
  scrollViewContent: {
    padding: 8,
    paddingRight: 24,
    paddingLeft: 24,
  },
  content: {
    flex: 2,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  formContent: {
    flex: 0.6,
    padding: 8,
    margin: 8,
  },
  titles: {
    flex: 1,
  }
});
