import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import React from "react";
import { Place } from "./PlaceType";
import { AntDesign } from "@expo/vector-icons";
import { CustomColors } from "../../themes/CustomColors";
import { Surface, Text } from "react-native-paper";

interface PlaceItemProps {
  place: Place;
}

export default function PlaceItem({ place }: PlaceItemProps) {
  const photoReference = place?.photos?.[0]?.photo_reference;
  const defaultImageSource = require("../../assets/placeholder.jpg");

  return (
    <Surface style={styles.itemContainer} mode="elevated" elevation={1}>
      <Image
        source={{
          uri: photoReference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyAABNPGkjDak4g3bd2_BxB1SVo0omURGck`
            : defaultImageSource.toString(),
        }}
        style={styles.imageItem}
      />
      <View style={styles.itemDescription}>
        <Text numberOfLines={2} style={styles.itemName}>
          {place.name}
        </Text>
        <Text numberOfLines={2} style={styles.itemVicinity}>
          {place.vicinity}
        </Text>
        <View style={styles.itemRating}>
          <AntDesign name="star" size={20} color={CustomColors.yellow} />
          <Text>{place.rating}</Text>
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: "white",
  },
  imageItem: {
    width: 112,
    height: 112,
    borderRadius: 16,
  },
  itemDescription: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "500",
    // fontFamily: 'raleway-SemiBold',
    marginBottom: 8,
  },
  itemVicinity: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
