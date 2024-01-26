import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import PlaceMarker from './PlaceMarker';
import { API_KEY } from '../../services/GlobaleApi';
import { UserLocationContextType, UserLocationContext } from '../../contexts/UserLocationContext';

interface GoogleMapViewProps {
  placeList: any[];
  userLocationContext?: UserLocationContextType;
}

export default function GoogleMapView({ placeList }: Readonly<GoogleMapViewProps>) {
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 49.1193,
    longitude: 6.1727,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  const userLocationContext = useContext<UserLocationContextType>(UserLocationContext);

  const [startPoint, setStartPoint] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

  useEffect(() => {
    if (userLocationContext?.location) {
      setMapRegion({
        latitude: userLocationContext.location.coords.latitude,
        longitude: userLocationContext.location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      setStartPoint({
        latitude: userLocationContext.location.coords.latitude,
        longitude: userLocationContext.location.coords.longitude,
      });
    }
  }, [userLocationContext]);

  const extractCoordinates = (place) => ({
    latitude: place?.geometry?.location?.lat || 0,
    longitude: place?.geometry?.location?.lng || 0,
  });

  const waypoints = placeList.slice(0, 4).map(extractCoordinates);

  return (
    <View style={styles.container}>
      <Text style={styles.texteTitre}>Meilleurs endroits à proximité</Text>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} showsUserLocation={true} region={mapRegion}>
          {startPoint && <Marker coordinate={startPoint} />}
          {placeList.map((item, index) => index < 4 && <PlaceMarker key={index} item={item} />)}
          <MapViewDirections
            origin={startPoint}
            waypoints={waypoints}
            destination={startPoint}
            apikey={API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            mode="WALKING"
          />
        </MapView>
      </View>
    </View>
  );
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
  },
  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    width: Dimensions.get('screen').width * 0.89,
    height: Dimensions.get('screen').height * 0.23,
  },
});
