import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native"
import { ColorScheme, CustomColors } from "../../themes/CustomColors"
import AppTitle from "../AppTitle"
import Logo from "../forms/Logo"
import { Title, Caption } from "react-native-paper"
import useCustomFonts from "../../hooks/useCustomFonts"

export default function HeaderProfile() {
    const [fonts, fontLoaded] = useCustomFonts();
    if (!fontLoaded) {
        return null;
    }

    return (
        <SafeAreaView
            style={styles.containerHeader}>
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
            <Text style={styles.textePresentation}>
                J'aime la magie, les mystères et partir à la découverte
            </Text>
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
        marginTop: 10,
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
        color: ColorScheme.primary,
        fontFamily: "Fontastique",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
        color: ColorScheme.secondary,
        fontFamily: "Fontastique",
    },
    textePresentation: {
        marginTop: 8,
        textAlign: 'center',
        fontFamily: "Fontastique",
        color: ColorScheme.primary,
        fontSize: 16,
    },
})
