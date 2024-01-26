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
  const [searchRadius, setSearchRadius] = useState("500"); // Default search radius is 500 meters
  const [transportationMode, setTransportationMode] = useState("walking"); // Default transportation mode is walking
  const [numberOfPlaces, setNumberOfPlaces] = useState("5"); // Default number of places to visit is 5
  const { location, setLocation } = useContext<UserLocationContextType>(UserLocationContext);
  let [picker, setPicker] = useState('WALKING');

  useEffect(() => {
    // Update the route when any of the configuration parameters change
    GetNearBySearchPlace('tourist_attraction');
  }, [location, searchRadius, transportationMode, numberOfPlaces])

  const GetNearBySearchPlace = (value: string) => {    
    if (location && location.coords) {
      GlobaleApi.nearByPlace(
        location.coords.latitude,
        location.coords.longitude,
        value,
        searchRadius,
        transportationMode
      ).then(Resp => {
        // Limit the number of places based on the user's preference
        const limitedPlaces = Resp.data.results.slice(0, parseInt(numberOfPlaces, 10));
        setPlacelist(limitedPlaces);
        
      });
    }
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Header />
      <TextInput
        value={searchRadius}
        onChangeText={(text) => setSearchRadius(text)}
        placeholder="Search Radius (in meters)"
        keyboardType="numeric"
      />
      {/*<Picker
        onChanged={setPicker}
        options={[
            {value: 'WALKING', text: 'A pied'},
            {value: 'DRIVING', text: 'En voiture'},
            {value: 'BICYCLING', text: 'A vélo'},
            {value: 'TRANSIT', text: 'Transports en commun'}
        ]}
        style={{borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 5, marginBottom: 5, padding: 5}}
        value={picker}
      />*/}
      <TextInput
        value={numberOfPlaces}
        onChangeText={(text) => setNumberOfPlaces(text)}
        placeholder="Number of Places to Visit"
        keyboardType="numeric"
      />
      <GoogleMapView placeList={placeList} />
      <CategoryList setSelectedCategory={(value: string) => GetNearBySearchPlace(value)} />
      {placeList ? <PlaceList placeList={placeList} /> : null}
    </ScrollView>
  )
}
