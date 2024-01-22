import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

interface PlaceMarkerProps {
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
    if (!item || !item.geometry || !item.geometry.location) {
        // Si certaines propriétés sont manquantes, renvoyer null pour éviter l'erreur.
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