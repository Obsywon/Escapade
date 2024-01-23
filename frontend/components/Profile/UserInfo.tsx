import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Avatar, Icon } from 'react-native-paper';
import { ColorScheme } from '../../themes/CustomColors';

export default function UserInfo() {
    return (
        <View style={styles.userInfoSection}>
            <View style={styles.row}>
                <Icon source="map-marker-radius" color={ColorScheme.primary} size={24} />
                <Text style={styles.textUser}>London, UK</Text>
            </View>
            <View style={styles.row}>
                <Icon source="phone" color={ColorScheme.primary} size={20} />
                <Text style={styles.textUser}>+44-900000009</Text>
            </View>
            <View style={styles.row}>
                <Icon source="email" color={ColorScheme.primary} size={20} />
                <Text style={styles.textUser}>harry_potter@gmail.com</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    userInfoSection: {   
        marginLeft: 16,     
        marginTop: 16,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },    
    textUser: {
        color:ColorScheme.secondary,
        marginLeft: 10,
    },
});
