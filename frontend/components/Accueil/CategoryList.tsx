import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'
import { Text } from 'react-native-paper'


interface CategoryListProps {
    setSelectedCategory: (value: string) => void;
}

type CategoryItemElement = {
    id: number,
    name: string,
    value: string,
    icon: NodeRequire,
}

const categoryList : CategoryItemElement[] = [
    {
        id: 1,
        name: 'Lieux touristiques',
        value: 'tourist_attraction',
        icon: require('./../../assets/tourist.png')
    },
    {
        id: 2,
        name: 'Musées',
        value: 'museum',
        icon: require('./../../assets/musee.png')
    },
    {
        id: 3,
        name: 'Galleries d\'art',
        value: 'art_gallery',
        icon: require('./../../assets/art.png')
    },
]

const CategoryList = ({ setSelectedCategory }: CategoryListProps): JSX.Element => {

    return (
        <View style={styles.container}>
            <Text style={styles.texteTitre}>Sélectionne une catégorie</Text>
            <View style={styles.categoryListContainer}>
                {
                    categoryList.map(category => (
                        <TouchableOpacity key={category.id} onPress={() => setSelectedCategory(category.value)}>
                        <CategoryItem category={category} />
                    </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}
export default CategoryList;

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    texteTitre: {
        fontSize: 24,
        // fontFamily: "raleway-SemiBold",        
    },
    categoryListContainer: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
