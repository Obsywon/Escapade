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

type EditProfileFormProps = {
    userData: Account;
};

export default function EditProfileForm({ userData }: Readonly<EditProfileFormProps>): JSX.Element {
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
        },
    });
    const navigation = useNavigation();

    const [UpdateUser, {loading, error, data}] = useMutation(UPDATE_USER);

    if (data){
        console.log(data);
    }
    if (error){
        console.log(error)
    }
    if (loading){
        console.log(loading)
    }
    function cancel() {
        navigation.goBack();
    }


    const onSubmit = handleSubmit((data) => {
        const user = {
            lastName: data.lastName,
        };
        console.log(data);
        UpdateUser({
            variables: {data}
        });
        console.log("UPDAAAATE: ", loading, error, data, UpdateUser);

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



                <BasicTextInput control={control} label="Description" name="description" multiline={true} placeholder="Décrivez-vous brièvement" rules={descriptionRules} />
                <BasicTextInput control={control} label="Ville" name="city" rules={cityRules} />
                <BasicTextInput control={control} label="Pays" name="country" rules={countryRules} />
                <BasicTextInput control={control} label="Numéro de téléphone" name="phone"
                    rules={{
                        validate: {
                            valid: v => (v == null || (v != null && Validator.isMobilePhone(v, 'fr-FR'))) || 'Le numéro de téléphone est invalide.',
                        },
                    }} />


                <View style={styles.buttons}>
                    <BasicButton color="rgb(200, 0, 0)" label="Annuler" onPress={cancel} disabled={loading}/>
                    <BasicButton label="Enregistrer" color={ColorScheme.secondary} disabled={loading} loading={loading} onPress={onSubmit} />
                </View>
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