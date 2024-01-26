import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { CustomColors } from '../../themes/CustomColors';

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
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 100,
        height: 100,
        backgroundColor: CustomColors.white,
        borderRadius: 15,        
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
