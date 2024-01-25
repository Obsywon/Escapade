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
import { AppNavigatorParamList } from "../navigation/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useNavigation } from "@react-navigation/native";

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

  const navigation =
    useNavigation<StackNavigationProp<AppNavigatorParamList>>();

  const { connectUserToFirebase } = useFirebaseAuth();
  //const user = useSelector<UserState>(state => state.user)

  const onSubmit = handleSubmit(async (data) => {
    const email = data.email;
    const password = data.password;

    try {
      const user = await connectUserToFirebase(email, password);
      window.alert("Utilisateur connecté : " + user);
      navigation.navigate("Accueil");
    } catch (error) {
      window.alert("Utilisateur non reconnu");
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
