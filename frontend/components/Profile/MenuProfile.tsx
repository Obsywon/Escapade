import { View, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableRipple, Icon, Text } from 'react-native-paper'
import { ColorScheme } from '../../themes/CustomColors'

export default function MenuProfile() {
    // const myCustomShare = async () => {
    //     const shareOptions = {
    //         message: 'Viens voir ce lieu avec l\'application Escapade. Je l\'ai déjà visité plus de 5 fois.',
    //         url: files.appLogo,
    //         // urls: [files.image1, files.image2]
    //     }

    //     try {
    //         const ShareResponse = await Share.open(shareOptions);
    //         console.log(JSON.stringify(ShareResponse));
    //     } catch (error) {
    //         console.log('Error => ', error);
    //     }
    // };
    return (
        <View>
            <View style={styles.menuProfile}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon source="heart-outline" color="#FF6347" size={24} />
                        <Text style={styles.menuItemText}>Mes Favoris</Text>
                    </View>
                </TouchableRipple>
                {/* <TouchableRipple onPress={myCustomShare}> */}
                <TouchableRipple onPress={() => {}}>
                    <View style={styles.menuItem}>
                        <Icon source="share-outline" color="#FF6347" size={24} />
                        <Text style={styles.menuItemText}>Partager avec mes amis</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon source="cog-outline" color="#FF6347" size={24} />
                        <Text style={styles.menuItemText}>Paramètres</Text>
                    </View>
                </TouchableRipple>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    menuProfile: {
        marginLeft: 16,     
        marginTop: 16,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    menuItemText: {
        color:ColorScheme.primary,
        marginLeft: 8,
        fontWeight: '600',
        fontSize: 16,
        
    },
})