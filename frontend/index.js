import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';

export default function Main() {
    return (
      <PaperProvider>
        <NavigationContainer>
        <App/>
        </NavigationContainer>
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
