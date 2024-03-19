import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MainLayout from "./layouts/MainLayout";

import { CustomTheme } from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

import { ApolloProvider } from "@apollo/client";

import * as Location from "expo-location";
import { UserLocationContext } from "./contexts/UserLocationContext";


import useApolloToken from "./hooks/useApolloClient";
import RootNavigator from "./navigation/RootNavigator";


function App(): JSX.Element {
  const {accessLoaded, accessToken, client} = useApolloToken();
  const [fonts, fontLoaded] = useCustomFonts();
  
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);



  // Pour la géolocalisation
  useEffect(() => {
    // Localisation
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("L'accès à la localisation a été refusé.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    })();
  }, []);

  if (!fontLoaded || !accessLoaded) {
    return (
      <PaperProvider theme={CustomTheme}>
        <LoadingSurface text="Chargement en cours..." />
      </PaperProvider>
    );
  }


  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={{ ...CustomTheme, fonts }}>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <NavigationContainer>
            <MainLayout>
              <RootNavigator isAuthentified={accessToken?.token != null}/>
            </MainLayout>
          </NavigationContainer>
        </UserLocationContext.Provider>
      </PaperProvider>
    </ApolloProvider>
  );
}

export default App;