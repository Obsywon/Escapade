import { useForm } from "react-hook-form";
import { Account, UpdateAccount } from "../../types/Account";
import { View, Text, StyleSheet } from "react-native";
import EmailInput from "../forms/EmailInput";
import FormLayout from "../../layouts/FormLayout";
import { ScrollView } from "react-native-gesture-handler";
import DatePicker from "../forms/DatePicker";
import BasicTextInput from "../forms/BasicTextInput";
import Validator from 'validator';
import { cityRules, countryRules, descriptionRules, lastNameRules, nameRules } from "../../services/formRules";
import BasicButton from "../forms/BasicButton";
import { useNavigation } from "@react-navigation/native";
import { ColorScheme } from "../../themes/CustomColors";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../services/userService";
import { isLoading } from "expo-font";
import ErrorText from "../forms/ErrorText";
import { useState } from "react";

type EditProfileFormProps = {
    userData: Account;
};

export default function EditProfileForm({ userData }: Readonly<EditProfileFormProps>): JSX.Element {

    const [date, setDate] = useState<Date>(new Date(userData.birthDate));
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateAccount>({
        defaultValues: {
            description: userData?.description,
            city: userData?.city,
            country: userData?.country,
            birthDate: userData.birthDate,
            lastName: userData.lastName,
            name: userData.name,
            gender: userData?.gender,
            phoneNumber: userData?.phoneNumber,
        },
    });
    const navigation = useNavigation();

    const [updateUser, { loading, error }] = useMutation(UPDATE_USER);



    const onSubmit = handleSubmit((data) => {

        const user = {
            ...data,
            userId: userData.id,
            birthDate: date,
        };

        updateUser({
            variables: { input: user },
            onCompleted: (data) =>{
                navigation.goBack();
            },
            onError: (err) => (console.log(err.cause)),
            fetchPolicy: 'no-cache',
        });

    }, (error) => console.log(error));


    return (
        <FormLayout>
            <ScrollView
                maximumZoomScale={1}
                minimumZoomScale={1}
                automaticallyAdjustContentInsets={true}
                pagingEnabled={true}
                contentContainerStyle={styles.scrollViewContent}
            >
                <BasicTextInput control={control} label="Prénom" name="name" isRequired={true} rules={nameRules} />
                <BasicTextInput control={control} label="Nom" name="lastName" isRequired={true} rules={lastNameRules} />

                <DatePicker date={date} setDate={setDate} label="Date de naissance" />

                <BasicTextInput control={control} label="Description" name="description" multiline={true} placeholder="Décrivez-vous brièvement" rules={descriptionRules} />
                <BasicTextInput control={control} label="Ville" name="city" rules={cityRules} />
                <BasicTextInput control={control} label="Pays" name="country" rules={countryRules} />
                <BasicTextInput control={control} label="Numéro de téléphone" name="phoneNumber"
                    rules={{
                        validate: {
                            valid: v => (v == null || (v != null && Validator.isMobilePhone(v, 'fr-FR'))) || 'Le numéro de téléphone est invalide.',
                        },
                    }} />


                <View style={styles.buttons}>
                    <BasicButton color="rgb(200, 0, 0)" label="Annuler" onPress={() => navigation.goBack()} disabled={loading} />
                    <BasicButton label="Enregistrer" disabled={loading} loading={loading} onPress={onSubmit} />
                </View>

                {error != null && (
                    <ErrorText>{error?.message}</ErrorText>
                )}
            </ScrollView>
        </FormLayout>
    )
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
        gap: 8,
    },
    buttons: {
        paddingVertical: 8,
        flex: 1,
        flexDirection: 'row',
        gap: 8,
    }
})