
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import GuestLayout from './layouts/GuestLayout';
import ConnectedLayout from './layouts/ConnectedLayout';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import pageBienvenue from './pages/pageBienvenue';
import InscriptionScreen from './pages/InscriptionScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [connected, setConnected] = useState<boolean>(false);



  return (
    <PaperProvider>
      <NavigationContainer>
        {connected ? (
          <ConnectedLayout />
        ) : (
          <Stack.Navigator initialRouteName="pageBienvenue">
            <Stack.Screen name="pageBienvenue" component={pageBienvenue} />
            <Stack.Screen name="InscriptionScreen" component={InscriptionScreen} />
            {/* <Stack.Screen name="pageConnexion" component={pageConnexion} /> */}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;


