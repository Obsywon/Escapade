import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Place } from './PlaceType';
import PlaceItem from './PlaceItem';
import PlaceItemBig from './PlaceItemBig';
import { Surface, Text } from 'react-native-paper';

interface PlaceListProps {
    placeList: Place[] | undefined;
  }

export default function PlaceList({placeList}: PlaceListProps) {
  return (
    <Surface style={{padding: 8, borderRadius: 16, backgroundColor: 'white', marginVertical: 8}}>
      <Text style={styles.texteTitre}>Found {placeList ? placeList.length : 0} places</Text>

      <FlatList 
      data={placeList}
      renderItem={({item, index})=>(
        index%4==0?
        <PlaceItemBig place={item} />
        : <PlaceItem place={item} />
      )}
      />
      
    </Surface>
  )
}

const styles = StyleSheet.create({
  texteTitre:{
    fontSize: 20,
    // fontFamily: 'raleway-SemiBold',
    marginTop: 10,
  }
})
