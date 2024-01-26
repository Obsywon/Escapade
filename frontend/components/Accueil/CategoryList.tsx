import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'

interface CategoryListProps {
    setSelectedCategory: (value: string) => void;
  }

const CategoryList = ({ setSelectedCategory }: CategoryListProps) : JSX.Element => {
    const categoryList=[
        {
            id:1,
            name:'Lieux touristiques',
            value:'tourist_attraction',
            icon:require('./../../assets/tourist.png')
        },
        {
            id:2,
            name:'Musées',
            value:'museum',
            icon:require('./../../assets/musee.png')
        },
        {
            id:3,
            name:'Galleries d\'art',
            value:'art_gallery',
            icon:require('./../../assets/art.png')
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
