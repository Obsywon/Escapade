import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { CustomColors } from '../../themes/CustomColors';
import { Text } from 'react-native-paper'

interface Category {
    id: number;
    name: string;
    value: string;
    icon: any;
}

interface CategoryItemProps {
    category: Category;
}

export default function CategoryItem({ category }: Readonly<CategoryItemProps>) {
    return (
        <View style={styles.itemContainer}>
            <Image source={category.icon}
                style={styles.icon}
            />
            <Text style={styles.name}>{category.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {

        alignItems: 'center',
        justifyContent: 'center',

        width: 96,
        height: 96,
        backgroundColor: CustomColors.white,
        borderRadius: 16,
    },
    icon: {
        width: 50,
        height: 50,
    },
    name: {
        fontSize: 13,
        // fontFamily: 'regular',
    }
})
