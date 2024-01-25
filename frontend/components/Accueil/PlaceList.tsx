import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Place } from './PlaceType';
import PlaceItem from './PlaceItem';
import PlaceItemBig from './PlaceItemBig';

interface PlaceListProps {
    placeList: Place[] | undefined;
  }

export default function PlaceList({placeList}: PlaceListProps) {
  return (
    <View>
      <Text style={styles.texteTitre}>Found {placeList ? placeList.length : 0} places</Text>

      <FlatList 
      data={placeList}
      renderItem={({item, index})=>(
        index%4==0?
        <PlaceItemBig place={item} />
        : <PlaceItem place={item} />
      )}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  texteTitre:{
    fontSize: 20,
    // fontFamily: 'raleway-SemiBold',
    marginTop: 10,
  }
})
