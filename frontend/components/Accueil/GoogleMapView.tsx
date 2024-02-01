import React, { useState, useContext, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import PlaceMarker from './PlaceMarker';
import { API_KEY } from '../../services/GlobaleApi';
import { UserLocationContextType, UserLocationContext } from '../../contexts/UserLocationContext';
import { Surface, Text } from 'react-native-paper';
import { TransportationMode } from '../../models/TransportationMode';

interface GoogleMapViewProps {
  placeList: any[];
  userLocationContext?: UserLocationContextType;
  transportMode: TransportationMode;
}

export default function GoogleMapView({ placeList, transportMode }: GoogleMapViewProps) {
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
      
      <Surface style={styles.mapContainer} mode='elevated' elevation={2}>
      <Text style={styles.texteTitre}>Meilleurs endroits à proximité</Text>
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
            mode={transportMode}
          />
        </MapView>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 16,
    
  },
  texteTitre: {
    fontSize: 16,
    marginBottom: 10,
  },
  mapContainer: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'white'
  },
  map: {
    width: Dimensions.get('screen').width * 0.89,
    height: Dimensions.get('screen').height * 0.23,
  },
});