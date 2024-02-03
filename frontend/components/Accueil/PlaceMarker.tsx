import React from 'react'
import { Marker } from 'react-native-maps'

export type PlaceMarkerProps = {
    item: {
        name?: string;
        geometry?: {
            location?: {
                lat: number;
                lng: number;          
            };
        };
    };
}

export default function PlaceMarker({ item }: PlaceMarkerProps) {
    if (!item?.geometry?.location) {
        return null;
    }
    return (
        <Marker
            title={item.name}
            coordinate={
                {
                    latitude: item.geometry.location.lat,
                    longitude: item.geometry.location.lng,
                }
            }
        />
    )
}