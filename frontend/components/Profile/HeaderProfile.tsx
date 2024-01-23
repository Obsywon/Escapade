import { View, Dimensions, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { CustomColors } from "../../themes/CustomColors"
import AppTitle from "../AppTitle"
import Logo from "../forms/Logo"
import { Title, Caption } from "react-native-paper"

export default function HeaderProfile() {
    return (
        <SafeAreaView style={styles.containerHeader}>
            <View style={styles.titleContainer}>
                <AppTitle title="Escapade" />
                <Logo />
            </View>
            <View style={styles.userInfoSection}>
                <Image source={require('./../../assets/user.png')} style={styles.userImage} />
                <View style={styles.userName}>
                    <Title style={styles.title}>Harry Potter</Title>
                    <Caption style={styles.caption}>Griffondor</Caption>
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        // flex: 1,        
    },
    titleContainer: {
        alignItems: 'center',
    },
    userInfoSection: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    userName: {
        marginLeft: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },

})
