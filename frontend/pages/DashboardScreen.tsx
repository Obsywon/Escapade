import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper'
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Accueil/Header';
import GoogleMapView from '../components/Accueil/GoogleMapView';
import CategoryList from '../components/Accueil/CategoryList';
import PlaceList from '../components/Accueil/PlaceList';
import { UserLocationContextType, UserLocationContext } from '../contexts/UserLocationContext';
import Picker from '@ouroboros/react-native-picker';
import nearByPlace from '../services/GlobaleApi';
import { TransportMode, transportOptions } from '../models/TransportMode'

export default function DashboardScreen(): JSX.Element {
  const [placeList, setPlacelist] = useState([]);
  const [searchRadius, setSearchRadius] = useState<string>('500');
  const [transportationMode, setTransportationMode] = useState<TransportMode>(TransportMode.WALKING);
  const [numberOfPlaces, setNumberOfPlaces] = useState<string>("5");
  const { location, setLocation } = useContext<UserLocationContextType>(UserLocationContext);

  useEffect(() => {
    GetNearBySearchPlace('tourist_attraction');
  }, [location, searchRadius, transportationMode, numberOfPlaces])


  const GetNearBySearchPlace = (value: string) => {
    if (location?.coords) {
      nearByPlace(
        location.coords.latitude,
        location.coords.longitude,
        value,
        parseInt(searchRadius)
      ).then(Resp => {
        const limitedPlaces = Resp.data.results.slice(0, parseInt(numberOfPlaces, 10));
        setPlacelist(limitedPlaces);
      });
    }
  }
  return (
    <View style={styles.scroll}>
      <GoogleMapView placeList={placeList} transportMode={transportationMode} />
      <CategoryList setSelectedCategory={(value: string) => GetNearBySearchPlace(value)} />
      <View style={{ marginVertical: 8 }}>
        <TextInput
          dense={true}
          label='Rayon de recherche (en mètres) :'
          mode='outlined'
          value={searchRadius}
          onChangeText={(text) => setSearchRadius(text)}
          placeholder="Ex : 500m"
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <TextInput
          dense={true}
          label="Nombre de lieux à visiter :"
          mode='outlined'
          value={numberOfPlaces}
          onChangeText={(text) => setNumberOfPlaces(text)}
          placeholder="Ex : 5"
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text>Mode de déplacement : </Text>
        <Picker
          onChanged={setTransportationMode}
          options={transportOptions}
          style={{ borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 5, padding: 5 }}
          value={transportationMode}
        />
      </View>



      {placeList ? <PlaceList placeList={placeList} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginHorizontal: 16,
  }
})