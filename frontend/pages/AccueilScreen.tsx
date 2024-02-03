import { ScrollView, StyleSheet, TextInput, View, Text} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Accueil/Header';
import GoogleMapView from '../components/Accueil/GoogleMapView';
import CategoryList from '../components/Accueil/CategoryList';
import PlaceList from '../components/Accueil/PlaceList';
import { UserLocationContextType, UserLocationContext } from '../contexts/UserLocationContext';
import Picker from '@ouroboros/react-native-picker';
import nearByPlace from '../services/GlobaleApi';

export default function AccueilScreen(): JSX.Element {
  const [placeList, setPlacelist] = useState([]);
  const [searchRadius, setSearchRadius] = useState("500"); 
  const [transportationMode, setTransportationMode] = useState("WALKING"); 
  const [numberOfPlaces, setNumberOfPlaces] = useState("5"); 
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
        searchRadius
      ).then(Resp => {
        const limitedPlaces = Resp.data.results.slice(0, parseInt(numberOfPlaces, 10));
        setPlacelist(limitedPlaces);
      });
    }
  }
  return (
    <ScrollView style={styles.scroll}>
      <Header />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
        <Text style={{ fontSize:15 }}>Rayon de recherche (en mètres) : </Text>
        <TextInput
          value={searchRadius}
          onChangeText={(text) => setSearchRadius(text)}
          placeholder="Ex : 500m"
          keyboardType="numeric"
          style={{ fontSize:15, marginLeft: 10, flex: 1 }}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize:15 }}>Nombre de lieux à visiter : </Text>
        <TextInput
          value={numberOfPlaces}
          onChangeText={(text) => setNumberOfPlaces(text)}
          placeholder="Ex : 5"
          keyboardType="numeric"
          style={{fontSize:15, marginLeft: 10, flex: 1 }}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderRadius: 20 }}>
        <Text style={{ fontSize: 15 }}>Mode de déplacement : </Text>
        <Picker
          onChanged={setTransportationMode}
          options={[
            { value: "WALKING", text: 'A pied' },
            { value: "DRIVING", text: 'En voiture' },
            { value: "BICYCLING", text: 'A vélo' },
            { value: "TRANSIT", text: 'Transports en commun' }
          ]}
          style={{ borderWidth: 0, borderColor: 'transparent', fontSize: 15, borderRadius: 5, padding: 5, marginLeft: 5, flex: 1, width: 100, height: 30 }}
          value={transportationMode}
        />
      </View>

      <GoogleMapView placeList={placeList} transportMode={transportationMode} />
      <CategoryList setSelectedCategory={(value: string) => GetNearBySearchPlace(value)} />

      {placeList ? <PlaceList placeList={placeList} /> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: 8,
  }
})