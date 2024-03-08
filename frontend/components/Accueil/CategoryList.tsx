import { View, StyleSheet } from "react-native";
import React from "react";
import CategoryItem from "./CategoryItem";
import { Surface, Text, TouchableRipple } from "react-native-paper";

interface CategoryListProps {
  setSelectedCategory: (value: string) => void;
}

const CategoryList = ({
  setSelectedCategory,
}: CategoryListProps): JSX.Element => {
  const categoryList = [
    {
      id: 1,
      name: "Lieux touristiques",
      value: "tourist_attraction",
      icon: require("./../../assets/tourist.png"),
    },
    {
      id: 2,
      name: "Musées",
      value: "museum",
      icon: require("./../../assets/musee.png"),
    },
    {
      id: 3,
      name: "Galleries d'art",
      value: "art_gallery",
      icon: require("./../../assets/art.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.texteTitre}>Sélectionnez une catégorie</Text>
      <Surface style={styles.categories}>
      {categoryList.map((category) => (
        <TouchableRipple
          onPress={() => setSelectedCategory(category.value)}
          key={category.id}
          style={styles.touchable}
          borderless={false}
        >
          <CategoryItem category={category} />
        </TouchableRipple>
      ))}
      </Surface>
    </View>
  );
};
export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    alignItems: "center",
  },
  categories: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: 'white'
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    height: 96,
  },
  texteTitre: {
    fontSize: 20,
    // fontFamily: "raleway-SemiBold",
  },
});
