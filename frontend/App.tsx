import "react-native-gesture-handler";
import React, { useState } from "react";
import GuestLayout from "./layouts/GuestLayout";
import ConnectedLayout from "./layouts/ConnectedLayout";
import { NavigationContainer } from "@react-navigation/native";
import {
  ActivityIndicator,
  configureFonts,
  PaperProvider,
  Surface,
  Text,
} from "react-native-paper";
import { CustomTheme } from "./themes/CustomTheme";
import { useFonts } from "expo-font";
import useCustomFonts from "./hooks/useCustomFonts";
import { StyleSheet } from "react-native";
import LoadingSurface from "./components/LoadingSurface";

function App(): JSX.Element {
  const [connected, setConnected] = useState<boolean>(false);
  const [fonts, fontLoaded] = useCustomFonts();

  if (!fontLoaded) {
    return (
      <PaperProvider theme={CustomTheme}>
      <LoadingSurface text="Chargement en cours..."/>
    </PaperProvider>
    );
  }
  
  return (
    <PaperProvider theme={{...CustomTheme, fonts}}>
        <NavigationContainer >
          { connected ? <ConnectedLayout /> : <GuestLayout />}
        </NavigationContainer>
      </PaperProvider>
  )
}

export default App;
