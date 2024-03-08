import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";
import AppTitle from "../components/AppTitle";
import MainTitle from "../components/MainTitle";
import PasswordInput from "../components/forms/PasswordInput";
import FormLayout from "../layouts/FormLayout";
import BasicButton from "../components/forms/BasicButton";
import EmailInput from "../components/forms/EmailInput";
import { useForm } from "react-hook-form";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { IdTokenResult, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../services/AuthService";
import { AppNavigatorParamList } from "../App";

type ConnexionFormData = {
  email: string;
  password: string;
};

function ConnexionScreen(): JSX.Element {
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

  const [loading, setLoading] = useState<boolean>(false);
  const navigation =
    useNavigation<StackNavigationProp<AppNavigatorParamList>>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;

    try { // Tentative d'authetification
      const userCredentials = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      // Si l'utilisateur est authentifié:
      if (userCredentials.user) {
        const user = userCredentials.user;
        const token: IdTokenResult = await user.getIdTokenResult();

        console.log("USER TOKEN:", token.token);
        navigation.replace("Dashboard");
      }
      return undefined;
    } catch (error: any) {
      console.error(error?.code, error?.message);
      throw error;
    } finally {
      setLoading(false);
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
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.titles}>
            <AppTitle title="Escapade" />
            <MainTitle title="Connexion" />
          </View>
          <EmailInput control={control} name="email" />
          <PasswordInput control={control} name="password" />
          <BasicButton
            label="Connexion"
            onPress={onSubmit}
            loading={loading}
            disabled={loading}
          />
        </ScrollView>
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
  scrollViewContent: {
    padding: 8,
    paddingRight: 24,
    paddingLeft: 24,
  },
  titles: {
    flex: 1,
  },
});

export default ConnexionScreen;
