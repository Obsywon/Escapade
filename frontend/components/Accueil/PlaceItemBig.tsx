import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

import { Place } from '../../types/PlaceType';
import { AntDesign } from '@expo/vector-icons';
import HorizontalLine from './HorizontalLine';
import { ColorScheme, CustomColors } from '../../themes/CustomColors';
import { Surface, Text } from "react-native-paper";

interface PlaceItemProps {
    place: Place;
}

export default function PlaceItemBig({ place }: PlaceItemProps) {

    const photoReference = place?.photos?.[0]?.photo_reference;
    const defaultImageSource = require('../../assets/placeholder.jpg');

    return (
        <Surface style={styles.itemBigContainer} mode="elevated" elevation={2}>
            {place?.photos ? <Image
                source={{
                    uri: photoReference
                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyAABNPGkjDak4g3bd2_BxB1SVo0omURGck`
                        : defaultImageSource
                }}
                style={styles.imageItemBig}
            /> : null}
            <Text
                numberOfLines={2}
                style={styles.itemBigName}
            >
                {place.name}
            </Text>
            <Text
                style={styles.itemBigVicinity}
                numberOfLines={2}
            >
                {place.vicinity}
            </Text>
            <View
                style={styles.itemBigRating}
            >
                <AntDesign name="star" size={20} color={CustomColors.yellow} />
                <Text>{place.rating}</Text>
            </View>
            
        </Surface>
    );
}

const styles = StyleSheet.create({
    itemBigContainer: {
        marginTop: 24,
        paddingBottom: 8,
        flex: 1,
        borderRadius: 16,
        backgroundColor: 'white',
    },
    imageItemBig: {
        width: "100%",
        minHeight: 124,
        borderRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    itemBigName: {
        fontSize: 18,
        paddingVertical: 8,
        paddingLeft: 8,
        // fontFamily: "raleway-SemiBold",
    },
    itemBigVicinity: {
        fontSize: 16,
        paddingLeft: 8,
        marginBottom: 8,
        color: CustomColors.dark_gray,
    },
    itemBigRating: {
        paddingLeft: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,        
    },
})
