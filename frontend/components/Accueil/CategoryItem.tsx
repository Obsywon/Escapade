import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { CustomColors } from "../../themes/CustomColors";
import { Text } from "react-native-paper";
interface Category {
  id: number;
  name: string;
  value: string;
  icon: any;
}

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({
  category,
}: Readonly<CategoryItemProps>) {
  return (
    <View style={styles.itemContainer}>
      <Image source={category.icon} style={styles.icon} />
      <Text style={styles.name}>{category.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 96,
    backgroundColor: CustomColors.white,
    borderRadius: 15,
  },
  icon: {
    width: 48,
    height: 48,
  },
  name: {
    fontSize: 13,
    // fontFamily: 'regular',
  },
});
