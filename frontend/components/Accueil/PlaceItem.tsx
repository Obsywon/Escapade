import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Place } from './PlaceType';
import { AntDesign } from '@expo/vector-icons';
import { ColorScheme, CustomColors } from '../../themes/CustomColors';

interface PlaceItemProps {
    place: Place;
}

export default function PlaceItem({ place }: PlaceItemProps) {

    const photoReference = place?.photos?.[0]?.photo_reference;
    const defaultImageSource = require('../../assets/placeholder.jpg')

    return (
        <View style={styles.itemContainer}>

            <Image
                source={{
                    uri: photoReference
                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyAABNPGkjDak4g3bd2_BxB1SVo0omURGck`
                        : defaultImageSource.toString()


                }}
                style={styles.imageItem}
            />
            <View style={styles.itemDescription}>
                <Text numberOfLines={2} style={styles.itemName}>{place.name}</Text>
                <Text numberOfLines={2} style={styles.itemVicinity}>{place.vicinity}</Text>
                <View style={styles.itemRating}>
                    <AntDesign name="star" size={20} color={CustomColors.yellow} />
                    <Text>{place.rating}</Text>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginTop: 20,
    },
    imageItem: {
        width: 110,
        height: 110,
        borderRadius: 15,
    },
    itemDescription: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        // fontFamily: 'raleway-SemiBold',
        marginBottom: 5,
    },
    itemVicinity: {
        fontSize: 18,
        marginBottom: 5,
    },
    itemRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    }
})
