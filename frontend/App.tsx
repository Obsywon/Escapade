
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import GuestLayout from './layouts/GuestLayout';
import ConnectedLayout from './layouts/ConnectedLayout';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { LightTheme as CustomLightTheme} from './themes/LightTheme';
import { DarkTheme as CustomDarkTheme} from './themes/DarkTheme';
import { useColorScheme } from 'react-native';

const { DarkTheme } = adaptNavigationTheme({ reactNavigationDark: DefaultTheme });
const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

function App(): JSX.Element {
  const [connected, setConnected] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  

  const AppTheme = colorScheme === 'dark'
    ? CustomDarkTheme
    : CustomLightTheme;
  const NavigationTheme = colorScheme === 'dark'
    ? DarkTheme
    : LightTheme;

  return (
    <PaperProvider theme={AppTheme}>
        <NavigationContainer theme={NavigationTheme}>
          { connected ? <ConnectedLayout /> : <GuestLayout />}
        </NavigationContainer>
      </PaperProvider>
  )
}

export default App;
