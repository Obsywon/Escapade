import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Accueil/Header'
import GoogleMapView from '../components/Accueil/GoogleMapView'
import GlobaleApi from '../Services/GlobaleApi';
import CategoryList from '../components/Accueil/CategoryList';
import PlaceList from '../components/Accueil/PlaceList';
import { UserLocationContextType, UserLocationContext } from '../components/Context/UserLocationContext';

export default function AccueilScreen() {
  const [placeList, setPlacelist] = useState([]);
  const { location, setLocation } = useContext<UserLocationContextType>(UserLocationContext);  
  
  useEffect(() => {
    GetNearBySearchPlace('restaurant');
  }, [location])

  const GetNearBySearchPlace = (value: string) => {    
    // console.log("Category", value)
    if (location && location.coords) {
      GlobaleApi.nearByPlace(location.coords.latitude, location.coords.longitude, value).then(Resp => {
        // console.log(Resp.data.results)
        // console.log("API Response:", Resp.data.results);
        setPlacelist(Resp.data.results);
      });
    }
  }
  return (
    <ScrollView>
      <Header />
      <GoogleMapView placeList={placeList} />
      <CategoryList setSelectedCategory={(value: string) => GetNearBySearchPlace(value)} />
      {placeList ? <PlaceList placeList={placeList} /> : null}
    </ScrollView>
  )
}