import { View, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableRipple, Icon, Text, Surface } from 'react-native-paper'
import { ColorScheme } from '../../themes/CustomColors'


const iconSize: number = 24;
const iconColor = ColorScheme.secondary;

export default function MenuProfile() {

    return (
        <View>
            <View style={styles.menuProfile}>
                <TouchableRipple onPress={() => { }} style={styles.menuRipple}>
                    <View style={styles.menuItem}>
                        <Icon source="heart-outline" color={iconColor} size={iconSize} />
                        <Text style={styles.menuItemText}>Mes Favoris</Text>
                    </View>
                </TouchableRipple>
                {/* <TouchableRipple onPress={myCustomShare}> */}
                <TouchableRipple onPress={() => { }} style={styles.menuRipple}>
                    <View style={styles.menuItem}>
                        <Icon source="share-outline" color={iconColor} size={iconSize} />
                        <Text style={styles.menuItemText}>Partager avec mes amis</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }} style={styles.menuRipple}>
                    <View style={styles.menuItem}>
                        <Icon source="cog-outline" color={iconColor} size={iconSize} />
                        <Text style={styles.menuItemText}>Paramètres</Text>
                    </View>
                </TouchableRipple>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    menuProfile: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        width: '100%',
    },
    menuRipple: {
        padding: 8,
        width: '100%',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        width: '100%',
    },
    menuItemText: {
        color: ColorScheme.primary,
        fontWeight: '600',
        fontSize: 16,
    },
})