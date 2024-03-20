import { StyleSheet } from 'react-native'
import React from 'react'
import { Place } from '../../types/PlaceType';
import PlaceItem from './PlaceItem';
import { Surface, Text } from 'react-native-paper';

interface PlaceListProps {
  placeList: Place[];
}

export default function PlaceList({ placeList }: Readonly<PlaceListProps>) {
  return (
    <Surface style={styles.container}>
      <Text style={styles.texteTitre}>Found {placeList ? placeList.length : 0} places</Text>

<<<<<<< HEAD
      {placeList.map((item) => (
       <PlaceItem key={item.name} place={item} />
=======
      {placeList.map((item, index) => (
         <PlaceItem key={index} place={item} />
>>>>>>> 0d3a7a1 (Ajout paramètres lieu)
    ))}

    </Surface>
  )
}

const styles = StyleSheet.create({
  container: { 
    padding: 8, 
    borderRadius: 16, 
    backgroundColor: 'white', 
    marginVertical: 8 
  },
  texteTitre: {
    fontSize: 16,
    padding: 8,
  }
})
