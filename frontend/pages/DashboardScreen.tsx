import { ScrollView, StyleSheet, View, } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Accueil/Header';
import GoogleMapView from '../components/Accueil/GoogleMapView';
import CategoryList from '../components/Accueil/CategoryList';
import PlaceList from '../components/Accueil/PlaceList';
import { UserLocationContextType, UserLocationContext } from '../contexts/UserLocationContext';
import Picker from '@ouroboros/react-native-picker';
import nearByPlace from '../service/GlobaleApi';
import { StackScreenProps } from '@react-navigation/stack';
import { TransportOptions, TransportationMode } from '../models/TransportationMode';
import { TextInput, Text } from 'react-native-paper';
import { AppNavigatorParamList } from '../navigation/RootNavigator';



type DashboardScreenProps = 
  StackScreenProps<AppNavigatorParamList, 'Dashboard'>;



export default function DashboardScreen({} : Readonly<DashboardScreenProps>): JSX.Element {
  
  
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

      <View style={styles.inputContainer}>
        <TextInput
          label="Rayon de recherche (en mètres)"
          value={searchRadius}
          onChangeText={(text: string) => setSearchRadius(text)}
          placeholder="Ex : 500"
          keyboardType="numeric"
        />

        <TextInput
          label="Nombre de lieux à visiter"
          value={numberOfPlaces}
          onChangeText={(text: string) => setNumberOfPlaces(text)}
          placeholder="Ex : 5"
          keyboardType="numeric"
        />

        <View style={{ borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 8, padding: 8, marginTop: 8 }}>
          <Text style={{ marginBottom: 4 }}>Mode de déplacement :</Text>
          <Picker
            onChanged={setTransportationMode}
            options={TransportOptions}
            value={transportationMode}
            style={{}}
          />
        </View>
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