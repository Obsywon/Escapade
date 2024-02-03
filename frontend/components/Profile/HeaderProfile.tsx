import { View, Image, StyleSheet } from "react-native"
import { ColorScheme } from "../../themes/CustomColors"
import { Title, Caption, Text } from "react-native-paper"

export default function HeaderProfile() {  
    return (
        <View
            style={styles.containerHeader}>

            <View style={styles.userInfo}>
                <Image source={require('./../../assets/user.png')} style={styles.userImage} />
                <View style={styles.userName}>
                    <Title style={styles.title}>Harry Potter</Title>
                    <Caption style={styles.caption}>Griffondor</Caption>
                </View>
            </View>
            <Text style={styles.textePresentation}>
                J'aime la magie, les mystères et partir à la découverte
            </Text>
        </View >
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        // flex: 1,        
    },
    titleContainer: {
        alignItems: 'center',        
    },
    userInfo: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'center',
        gap: 8,
    },
    userImage: {
        width: 48,
        height: 48,
        borderRadius: 96,
    },
    userName: {
        marginLeft: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: ColorScheme.primary,
        // fontFamily: "Fontastique",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
        color: ColorScheme.secondary,
        // fontFamily: "Fontastique",
    },
    textePresentation: {
        marginTop: 8,
        textAlign: 'center',
        // fontFamily: "Fontastique",
        color: ColorScheme.primary,
        fontSize: 16,
    },
})
