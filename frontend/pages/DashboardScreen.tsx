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
import { AppNavigatorParamList } from '../navigation/AppNavigator';
import { TransportOptions, TransportationMode } from '../models/TransportationMode';
import { TextInput, Text } from 'react-native-paper';



type DashboardScreenProps = 
  StackScreenProps<AppNavigatorParamList, 'Dashboard'>;



export default function DashboardScreen({route}: DashboardScreenProps): JSX.Element {
  
  
  const [placeList, setPlacelist] = useState([]);
  const [searchRadius, setSearchRadius] = useState<string>("500"); 
  const [transportationMode, setTransportationMode] = useState<TransportationMode>(TransportationMode.WALKING); 
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
    <ScrollView style={styles.scroll}>
      <Header />

      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <TextInput
          mode='outlined'
          label="Rayon de recherche (en mètres) :"
          value={searchRadius}
          onChangeText={(text : string) => setSearchRadius(text)}
          placeholder="Ex : 500m"
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <TextInput
          mode='outlined'
          label="Nombre de lieux à visiter :"
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
          options={TransportOptions}
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

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: 8,
  }
})