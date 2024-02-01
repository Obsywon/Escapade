import { View, StyleSheet, Image, Dimensions, TextInput } from 'react-native'
import React from 'react'
import Logo from '../forms/Logo'
import AppTitle from '../AppTitle'
import { CustomColors } from '../../themes/CustomColors'

export default function Header() {
    return (
        <View style={styles.containerHeader}>
            <View style={styles.titleContainer}>
                <AppTitle title="Escapade" />
            </View>
            <View style={styles.contentContainer}>
                <Logo style={styles.logo} />
                <TextInput placeholder='Search' style={styles.searchbar} />
                <Image source={require('./../../assets/user.png')} style={styles.userImage} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',      
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',        
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
    },
    logo: {
        width: 45,
        height: 60,
    },
    searchbar: {
        borderWidth: 1,
        borderColor: CustomColors.black,
        padding: 8,
        borderRadius: 50,
        paddingLeft: 10,
        width: Dimensions.get('screen').width * 0.6,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
})
