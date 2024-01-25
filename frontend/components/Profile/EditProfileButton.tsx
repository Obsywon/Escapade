import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ColorScheme } from '../../themes/CustomColors'
import BasicButton from '../forms/BasicButton'
import { SafeAreaView } from 'react-native-safe-area-context';

interface EditProfileButtonProps {
    navigation: any;
};

export default function EditProfileButton({ navigation }: EditProfileButtonProps) {
    return (
        <SafeAreaView style={{alignItems: 'center'}} >
        <View style={styles.buttonContainer}>
            <BasicButton
                label="Modifier le profil"
                onPress={() => navigation.navigate('EditProfileScreen')}
                color={ColorScheme.secondary}
            />
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {        
        width: '50%',
    },
})
