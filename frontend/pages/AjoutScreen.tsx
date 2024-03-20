import React, { useState, useContext, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Modal, Portal, Text, Card, IconButton, Chip } from 'react-native-paper'
import { BottomTabParamList } from '../navigation/TabNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { UserLocationContextType, UserLocationContext } from '../contexts/UserLocationContext';
import GoogleMapView from '../components/Accueil/GoogleMapView';
import { useMutation } from '@apollo/client';
import { CREATE_PLACE } from '../services/placeService';
import { useForm } from 'react-hook-form';


type AjoutScreenProps = BottomTabScreenProps<BottomTabParamList, 'Ajout'>;
type LocalPlace = {
  longitude: number,
  latitude: number,
}

export default function AjoutScreen(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const userLocationContext = useContext<UserLocationContextType>(UserLocationContext);
  const [coordinatesManually, setCoordinatesManually] = useState<number[] | undefined>();
  const [useLocalCoordinates, setUseLocalCoordinates] = useState<boolean | undefined>();

  const [showModal, setShowModal] = useState(false);

  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorPlace, setErrorPlace] = useState<boolean>(false);

  const [createPlace, { loading, error }] = useMutation(CREATE_PLACE);


  function openModal(): void {
    setUseLocalCoordinates(false);
    setShowModal(true);
  }

  function handleSecondMapMarkerChange(newMarker: LocalPlace | undefined): void {
    if (newMarker != null) setCoordinatesManually([newMarker.latitude, newMarker.longitude]);
  }



  async function submit(): Promise<void> {
    let coords: number[] | undefined = undefined;

    if (useLocalCoordinates) {
      if (userLocationContext?.location?.coords != null) {
        coords = [userLocationContext.location?.coords.latitude, userLocationContext.location?.coords.longitude];
      }
    } else {
      coords = coordinatesManually;
    }
    setErrorName(name.length < 3)
    setErrorPlace(coords == null);

    

    if (name.length < 3 || coords == null) return;

    const newPlace = {
      name: name,
      description: description,
      latitude: coords[0],
      longitude: coords[1],
    }

    console.log(newPlace);

    createPlace({
      variables: { input: newPlace },
      onCompleted: (data) => {
          console.log("COMPLETED new place: ", data);
      },
      onError: (err) => (console.log(err)),
      fetchPolicy: 'no-cache',
  });


    setName('');
    setDescription('');
    setCoordinatesManually(undefined);
    setUseLocalCoordinates(undefined);
    setShowModal(false);
  }


  const CloseButton = () => useMemo(() => <IconButton icon="close" iconColor="red" size={24} onPress={() => setShowModal(false)} />, []);

  return (

    <>
      <Portal>
        <Modal visible={showModal} contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 80 }}>
          <Card mode='elevated'>
            <Card.Title title="Sélectionner le lieu" subtitle="Taper sur la carte pour sélectionner le lieu"
              right={CloseButton}
            >
            </Card.Title>
            <Card.Content>
              <View style={{
                borderRadius: 8,
                overflow: "hidden",
                width: '100%',
                height: '90%',
              }}>
                <GoogleMapView onSecondMapMarkerChange={handleSecondMapMarkerChange} />
              </View>
              <Button mode="contained" onPress={() => setShowModal(false)}>Fermer </Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>


      <View style={styles.screen}>
        <Text variant='displaySmall'>Ajouter un lieu</Text>
        <TextInput
          mode='outlined'
          label="Nom"
          value={name}
          onChangeText={setName}
          placeholder="Entrez le nom du nouveau lieu"
        />

        <TextInput
          mode='outlined'
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Descrivez le lieu (optionnel)"
          multiline={true}
          numberOfLines={3}
        />

        <Text variant='headlineSmall'>Coordonnées du lieu :</Text>

        <View style={styles.buttonContainer}>
          <Chip
            mode='outlined'
            onPress={() => setUseLocalCoordinates(true)}
            showSelectedCheck={true}
            selected={useLocalCoordinates}
          >Utiliser votre position actuelle</Chip>
          <Chip
            mode='outlined'
            showSelectedCheck={true}
            selected={!useLocalCoordinates && coordinatesManually != null}
            onPress={openModal}
          >Sélectionner la position manuellement</Chip>
        </View>
        <Button mode='contained' loading={loading} disabled={errorName || errorPlace} onPress={submit}>Soumettre</Button>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    gap: 24
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'center'
  }
});
