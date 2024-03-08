import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { Text, Checkbox } from 'react-native-paper'; // Importation de Checkbox
import { BottomTabParamList } from '../navigation/TabNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type AjoutScreenProps = BottomTabScreenProps<BottomTabParamList, 'Ajout'>;

export default function AjoutScreen(): JSX.Element {
  const [nom, setNom] = useState('');
  const [prendreCoordonnees, setPrendreCoordonnees] = useState(false);
  const [ajouterCoordonneesManuellement, setAjouterCoordonneesManuellement] = useState(false);

  function handleSubmit(): void {
    setNom('');
    setPrendreCoordonnees(false);
    setAjouterCoordonneesManuellement(false);
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.label}>Nom :</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
        placeholder="Entrez le nom du lieu"
      />

      <Text style={styles.label}>Coordonées du lieu :</Text>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={prendreCoordonnees ? 'checked' : 'unchecked'}
          onPress={() => setPrendreCoordonnees(!prendreCoordonnees)}
        />
        <Text>Prendre les coordonnées du lieu actuel</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={ajouterCoordonneesManuellement ? 'checked' : 'unchecked'}
          onPress={() => setAjouterCoordonneesManuellement(!ajouterCoordonneesManuellement)}
        />
        <Text>Rajouter les coordonnées manuellement</Text>
      </View>

      <Text style={styles.label}>Photo du lieu :</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={prendreCoordonnees ? 'checked' : 'unchecked'}
          onPress={() => setPrendreCoordonnees(!prendreCoordonnees)}
        />
        <Text>Prendre photo avec la caméra</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={ajouterCoordonneesManuellement ? 'checked' : 'unchecked'}
          onPress={() => setAjouterCoordonneesManuellement(!ajouterCoordonneesManuellement)}
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
