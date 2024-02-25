import { ScrollView, StyleSheet, View, } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Accueil/Header';
import GoogleMapView from '../components/Accueil/GoogleMapView';
import CategoryList from '../components/Accueil/CategoryList';
import PlaceList from '../components/Accueil/PlaceList';
import { UserLocationContextType, UserLocationContext } from '../contexts/UserLocationContext';
import Picker from '@ouroboros/react-native-picker';
import nearByPlace from '../services/GlobaleApi';
import { StackScreenProps } from '@react-navigation/stack';
import { TransportOptions, TransportationMode } from '../models/TransportationMode';
import { TextInput, Text } from 'react-native-paper';
import { AppNavigatorParamList } from '../App';



type DashboardScreenProps = 
  StackScreenProps<AppNavigatorParamList, 'Dashboard'>;



export default function DashboardScreen(): JSX.Element {
  
  
  const [placeList, setPlacelist] = useState([]);
  const [searchRadius, setSearchRadius] = useState<string>("Rayon de recherche (en mètres)"); 
  const [transportationMode, setTransportationMode] = useState<TransportationMode>(TransportationMode.PLACEHOLDER); 
  const [numberOfPlaces, setNumberOfPlaces] = useState<string>("Nombre de lieux à visiter"); 
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
    <ScrollView style={styles.scroll}>
      <Header />
      <View style={styles.inputContainer} >
        <TextInput
          mode='outlined'
          value={searchRadius}
          onChangeText={(text : string) => setSearchRadius(text)}
          placeholder="Rayon de recherche (en mètres)"
          keyboardType="numeric"
        />

        <TextInput
          mode='outlined'
          value={numberOfPlaces}
          onChangeText={(text: string) => setNumberOfPlaces(text)}
          placeholder="Nombre de lieux à visiter"
          keyboardType="numeric"
        />
 
        <Picker
          onChanged={setTransportationMode}
          options={TransportOptions}
          style={{ borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 8, padding: 13, fontWeight: 'bold' }}
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
  },
  inputContainer: {
    gap: 8,
    margin: 8,
  }
})