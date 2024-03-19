import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ColorScheme } from '../../themes/CustomColors'
import BasicButton from '../forms/BasicButton'

interface EditProfileButtonProps {
    onPress: ()=>void;
};

export default function EditProfileButton({ onPress }: Readonly<EditProfileButtonProps>) {
    return (
        <View style={{alignItems: 'center'}} >
        <View style={styles.buttonContainer}>
            <BasicButton
                label="Modifier le profil"
                onPress={onPress}
                color={ColorScheme.secondary}
            />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {        
        width: '50%',
    },
})
