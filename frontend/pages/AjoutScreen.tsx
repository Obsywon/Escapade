import React, { useState, useContext } from 'react';
import { Button, TextInput, View, StyleSheet, Modal } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import { BottomTabParamList } from '../navigation/TabNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { UserLocationContextType, UserLocationContext } from '../contexts/UserLocationContext';
import GoogleMapView from '../components/Accueil/GoogleMapView';

type AjoutScreenProps = BottomTabScreenProps<BottomTabParamList, 'Ajout'>;

interface userLocationProps {
  userLocationContext?: UserLocationContextType;
}

export default function AjoutScreen(): JSX.Element {
  const [nom, setName] = useState('');
  const userLocationContext = useContext<UserLocationContextType>(UserLocationContext);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [localCoordinates, setLocalCoordinates] = useState(false);
  const [coordinatesManually, setCoordinatesManually] = useState(false);
  const [takePicture, setTakePicture] = useState(false);
  const [uploadedPicture, setUploadedPicture] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSecondMapMarkerChange = (newMarker: { latitude: number; longitude: number } | undefined) => {
    if(newMarker)
      setCoordinates([newMarker?.latitude,newMarker?.longitude]);
  };

  function handleLocalCoordinatesToggle() {
    setLocalCoordinates(!localCoordinates);
    setCoordinatesManually(false);
  }

  function handleCoordinatesManuallyToggle() {
    setCoordinatesManually(!coordinatesManually);
    setLocalCoordinates(false);
    setShowModal(!coordinatesManually); 
  }
  

  function handleSubmit(): void {
    if (localCoordinates) {
      if (userLocationContext?.location) {
        setCoordinates([userLocationContext.location.coords.latitude, userLocationContext.location.coords.longitude]);
      } 
    } 

    setName('');
    setCoordinates([0, 0]);
    setShowModal(false);
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.label}>Nom :</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setName}
        placeholder="Entrez le nom du lieu"
      />

      <Text style={styles.label}>Coordonnées du lieu :</Text>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={localCoordinates ? 'checked' : 'unchecked'}
          onPress={handleLocalCoordinatesToggle}
        />
        <Text>Prendre les coordonnées du lieu actuel</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={coordinatesManually ? 'checked' : 'unchecked'}
          onPress={handleCoordinatesManuallyToggle}
        />
        <Text>Rajouter les coordonnées manuellement</Text>
      </View>

      <Modal visible={showModal} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Saisir les coordonnées manuellement</Text>
          <GoogleMapView  onSecondMapMarkerChange={handleSecondMapMarkerChange}/>
          <Button title="Fermer" onPress={() => setShowModal(false)} />
        </View>
      </Modal>

      <Text style={styles.label}>Photo du lieu :</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={takePicture ? 'checked' : 'unchecked'}
          onPress={() => setTakePicture(!takePicture)}
        />
        <Text>Prendre une photo avec la caméra</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={uploadedPicture ? 'checked' : 'unchecked'}
          onPress={() => setUploadedPicture(!uploadedPicture)}
        />
        <Text>Télécharger une photo</Text>
      </View>

      <Button title="Soumettre" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
