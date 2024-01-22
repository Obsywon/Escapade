import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'

interface CategoryListProps {
    setSelectedCategory: (value: string) => void;
  }

const CategoryList: React.FC<CategoryListProps> = ({ setSelectedCategory }) => {

// export default function CategoryList(setSelectedCategory) {

    const categoryList=[
        {
            id:1,
            name:'Gas Station',
            value:'gas_station',
            icon:require('./../../assets/gas.png')
        },
        {
            id:2,
            name:'Restaurants',
            value:'restaurant',
            icon:require('./../../assets/food.png')
        },
        {
            id:3,
            name:'Touriste-Attraction',
            value:'tourist_attraction',
            icon:require('./../../assets/musee.png')
        },
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.texteTitre}>Select Top Category</Text>
            <FlatList 
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=>(                    
                    <TouchableOpacity onPress={()=>setSelectedCategory(item.value)}>
                        <CategoryItem category={item}/>
                    </TouchableOpacity>
                )}                
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}
export default CategoryList;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    texteTitre: {
        fontSize: 20,
        // fontFamily: "raleway-SemiBold",        
    }
})
