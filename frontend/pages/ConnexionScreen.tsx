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
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig, app, auth } from "../components/firebaseConfig";


interface ConnexionScreenProps {
  navigation: any;
}

type ConnexionFormData = {
  email: string;
  password: string;
};

export default function ConnexionScreen({ navigation }: ConnexionScreenProps): JSX.Element {
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

  const onSubmit = handleSubmit((data) => {

    const email = data.email; 
    const password = data.password; 

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.alert("Utilisateur connecté : " + user.email);
        navigation.navigate('Accueil');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
        window.alert("Utilisateur non reconnu");
      });
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
          <BasicButton label="Connexion" onPress={onSubmit} />
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
