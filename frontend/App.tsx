
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import GuestLayout from './layouts/GuestLayout';
import ConnectedLayout from './layouts/ConnectedLayout';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { CustomTheme} from './themes/CustomTheme';


function App(): JSX.Element {
  const [connected, setConnected] = useState<boolean>(false);



  return (
    <PaperProvider theme={CustomTheme}>
        <NavigationContainer >
          { connected ? <ConnectedLayout /> : <GuestLayout />}
        </NavigationContainer>
      </PaperProvider>
  )
}

export default App;
