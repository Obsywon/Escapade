import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Accueil/Header'
import GoogleMapView from '../components/Accueil/GoogleMapView'
import GlobaleApi from '../Services/GlobaleApi';
import CategoryList from '../components/Accueil/CategoryList';
import PlaceList from '../components/Accueil/PlaceList';
import { UserLocationContextType, UserLocationContext } from '../contexts/UserLocationContext';

export default function AccueilScreen() {
  const [placeList, setPlacelist] = useState([]);
  const { location, setLocation } = useContext<UserLocationContextType>(UserLocationContext);


  useEffect(() => {
    GetNearBySearchPlace('tourist_attraction');
  }, [location])

  const GetNearBySearchPlace = (value: string) => {    
    // console.log("Category", value)
    if (location?.coords) {
      GlobaleApi.nearByPlace(location.coords.latitude, location.coords.longitude, value).then(Resp => {
        setPlacelist(Resp.data.results);
      });
    }
  }
  return (
    <ScrollView style={{ padding: 20 }}>
      <Header />
      <GoogleMapView placeList={placeList} />
      <CategoryList setSelectedCategory={(value: string) => GetNearBySearchPlace(value)} />
      {placeList ? <PlaceList placeList={placeList} /> : null}
    </ScrollView>
  )
}