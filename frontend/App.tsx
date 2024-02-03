import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MainLayout from "./layouts/MainLayout";

import { CustomTheme } from "./themes/CustomTheme";
import useCustomFonts from "./hooks/useCustomFonts";
import LoadingSurface from "./components/LoadingSurface";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import * as Location from "expo-location";
import { UserLocationContext } from "./contexts/UserLocationContext";

import { AuthProvider } from "./contexts/AuthContext";
import env from "./env";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./navigation/TabNavigator";
import BienvenueScreen from "./pages/BienvenueScreen";
import ConnexionScreen from "./pages/ConnexionScreen";
import EditProfileScreen from "./pages/EditProfileScreen";
import InscriptionScreen from "./pages/InscriptionScreen";

export type AppNavigatorParamList = {
  Bienvenue: undefined;
  Inscription: undefined;
  Connexion: undefined;
  Accueil: undefined;
  ModifierProfil: undefined;
};

const Stack = createStackNavigator<AppNavigatorParamList>();

function App(): JSX.Element {
  const [fonts, fontLoaded] = useCustomFonts();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isConnected, setConnected] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    })();
  }, []);

  const client = new ApolloClient({
    uri: env.BACKEND_APP_URI,
    cache: new InMemoryCache(),
  });

  if (!fontLoaded) {
    return (
      <ApolloProvider client={client}>
        <PaperProvider theme={CustomTheme}>
          <LoadingSurface text="Chargement en cours..." />
        </PaperProvider>
      </ApolloProvider>
    );
  }

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <PaperProvider theme={{ ...CustomTheme, fonts }}>
          <UserLocationContext.Provider value={{ location, setLocation }}>
            <NavigationContainer>
              <MainLayout>
                <Stack.Navigator initialRouteName="Bienvenue"
                screenOptions={{
                  headerShown: false
                }}
                >
                  {isConnected ? (
                    <>
                      <Stack.Screen name="Accueil" component={TabNavigator} />
                      <Stack.Screen
                        name="ModifierProfil"
                        component={EditProfileScreen}
                      />
                    </>
                  ) : (
                    <>
                      <Stack.Screen
                        name="Bienvenue"
                        component={BienvenueScreen}
                      />
                      <Stack.Screen
                        name="Inscription"
                        component={InscriptionScreen}
                      />
                      <Stack.Screen
                        name="Connexion"
                        component={ConnexionScreen}
                      />
                    </>
                  )}
                </Stack.Navigator>
              </MainLayout>
            </NavigationContainer>
          </UserLocationContext.Provider>
        </PaperProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
