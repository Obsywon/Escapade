import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import InscriptionScreen from '../pages/InscriptionScreen';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

function ConnectedLayout(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const Drawer = createDrawerNavigator();

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Drawer.Navigator initialRouteName="Inscription">
        <Drawer.Screen name="Inscription" component={InscriptionScreen} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

export default ConnectedLayout;
