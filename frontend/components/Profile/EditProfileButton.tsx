import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ColorScheme } from '../../themes/CustomColors'
import BasicButton from '../forms/BasicButton'
import { SafeAreaView } from 'react-native-safe-area-context';

interface EditProfileButtonProps {
    onPress: ()=>void;
};

export default function EditProfileButton({ onPress }: EditProfileButtonProps) {
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
