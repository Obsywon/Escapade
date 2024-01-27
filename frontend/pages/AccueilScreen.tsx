import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Accueil/Header';
import GoogleMapView from '../components/Accueil/GoogleMapView';
import GlobaleApi from '../Services/GlobaleApi';
import CategoryList from '../components/Accueil/CategoryList';
import PlaceList from '../components/Accueil/PlaceList';
import { UserLocationContextType, UserLocationContext } from '../components/Context/UserLocationContext';
import Picker from '@ouroboros/react-native-picker';

export default function AccueilScreen() {
  const [placeList, setPlacelist] = useState([]);
  const [searchRadius, setSearchRadius] = useState("500"); 
  const [transportationMode, setTransportationMode] = useState("WALKING"); 
  const [numberOfPlaces, setNumberOfPlaces] = useState("5"); 
  const { location, setLocation } = useContext<UserLocationContextType>(UserLocationContext);

  useEffect(() => {
    GetNearBySearchPlace('tourist_attraction');
  }, [location, searchRadius, transportationMode, numberOfPlaces])

  const GetNearBySearchPlace = (value: string) => {    
    if (location && location.coords) {
      GlobaleApi.nearByPlace(
        location.coords.latitude,
        location.coords.longitude,
        value,
        searchRadius
      ).then(Resp => {
        const limitedPlaces = Resp.data.results.slice(0, parseInt(numberOfPlaces, 10));
        setPlacelist(limitedPlaces);
      });
    }
  }

return (
    <ScrollView style={{ padding: 20 }}>
      <Header />

      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <Text>Rayon de recherche (en mètres) : </Text>
        <TextInput
          value={searchRadius}
          onChangeText={(text) => setSearchRadius(text)}
          placeholder="Ex : 500m"
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text>Nombre de lieux à visiter : </Text>
        <TextInput
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
          options={[
              { value: "WALKING", text: 'A pied' },
              { value: "DRIVING", text: 'En voiture' },
              { value: "BICYCLING", text: 'A vélo' },
              { value: "TRANSIT", text: 'Transports en commun' }
          ]}
          style={{ borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 5, padding: 5 }}
          value={transportationMode}
        />
      </View>

      <GoogleMapView placeList={placeList} transportMode={transportationMode} />
      <CategoryList setSelectedCategory={(value: string) => GetNearBySearchPlace(value)} />

      {placeList ? <PlaceList placeList={placeList} /> : null}
    </ScrollView>
  );
}
