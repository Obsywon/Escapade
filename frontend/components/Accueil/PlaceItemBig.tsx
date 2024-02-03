import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

import { AntDesign } from '@expo/vector-icons';
import HorizontalLine from './HorizontalLine';
import { ColorScheme, CustomColors } from '../../themes/CustomColors';
import { Place } from '../../models/Place';

interface PlaceItemProps {
    place: Place;
}

export default function PlaceItemBig({ place }: PlaceItemProps) {

    const photoReference = place?.photos?.[0]?.photo_reference;
    const defaultImageSource = require('../../assets/placeholder.jpg');

    return (
        <View style={styles.itemBigContainer}>
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
            <HorizontalLine />
        </View>
    );
}

const styles = StyleSheet.create({
    itemBigContainer: {
        marginTop: 20,
    },
    imageItemBig: {
        width: "100%",
        height: 130,
        borderRadius: 15,
    },
    itemBigName: {
        fontSize: 18,
        marginBottom: 2,
        // fontFamily: "raleway-SemiBold",
    },
    itemBigVicinity: {
        fontSize: 16,
        marginBottom: 5,
        color: CustomColors.dark_gray,
    },
    itemBigRating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,        
    },
})
