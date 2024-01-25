import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import CustomMarkerImage from '../../assets/logo.png'
import PlaceMarker from './PlaceMarker'
import { UserLocationContextType, UserLocationContext } from '../../contexts/UserLocationContext'

interface GoogleMapViewProps {
    placeList: any[];
    userLocationContext?: UserLocationContextType; 
}

export default function GoogleMapView({ placeList }: GoogleMapViewProps) {
    const [mapRegion, setMapRegion] = useState<Region>({
        latitude: 49.1193,       // Latitude initiale
        longitude: 6.1727,      // Longitude initiale
        latitudeDelta: 0.0522,   // Variation de latitude (zoom)
        longitudeDelta: 0.0421,  // Variation de longitude (zoom)
    });    
    // console.log("location", location)

    const userLocationContext = useContext<UserLocationContextType>(UserLocationContext);

    useEffect(() => {
        if (userLocationContext && userLocationContext.location) {
            setMapRegion({
                latitude: userLocationContext.location.coords.latitude,
                longitude: userLocationContext.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
        // console.log("PlaceList in GoogleMapView:", placeList);
    }, [userLocationContext])
    return (
        <View style={styles.container}>
            <Text style={styles.texteTitre}>
                Meilleurs endroits à proximité
            </Text>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    region={mapRegion}
                >
                    <Marker
                        title='Vous'
                        coordinate={mapRegion}
                        image={CustomMarkerImage}
                    />
                    {placeList.map((item, index) => index < 4 && (
                        <PlaceMarker key={index} item={item} />
                    ))}

                </MapView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    texteTitre: {
        fontSize: 20,
        marginBottom: 10,
        // fontWeight: '600',
        // fontFamily: 'raleway-SemiBold',
    },
    mapContainer: {

        borderRadius: 20,
        overflow: 'hidden',
    },
    map: {
        width: Dimensions.get('screen').width * 0.89,
        height: Dimensions.get('screen').height * 0.23,

    }
})
