/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import GuestLayout from './layouts/GuestLayout';
import ConnectedLayout from './layouts/ConnectedLayout';

function App(): JSX.Element {
  const [connected, setConnected] = useState<boolean>(false);

  if (!connected) {
    return <GuestLayout />;
  }

  return <ConnectedLayout />;
}

export default App;
