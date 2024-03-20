import { createStackNavigator } from "@react-navigation/stack";
import BienvenueScreen from "../pages/BienvenueScreen";
import ConnexionScreen from "../pages/ConnexionScreen";
import EditProfileScreen from "../pages/EditProfileScreen";
import InscriptionScreen from "../pages/InscriptionScreen";
import ProfileScreen from "../pages/ProfileScreen";
import { firebaseAuth } from "../service/AuthService";
import TabNavigator from "./TabNavigator";

export type AppNavigatorParamList = {
    Bienvenue: undefined;
    Inscription: undefined;
    Connexion: undefined;
    Dashboard: undefined;
    ModifierProfil: undefined;
    Profil: undefined;
};

const Stack = createStackNavigator<AppNavigatorParamList>();

type RootNavigatorProps = {
    isAuthentified: boolean
};

export default function RootNavigator({ isAuthentified }: Readonly<RootNavigatorProps>): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={isAuthentified ? "Dashboard" : "Bienvenue"}
            screenOptions={{
                headerShown: false
            }}
        >
            {isAuthentified ? (
                <>
                    <Stack.Screen name="Dashboard" component={TabNavigator} />
                    <Stack.Screen
                        name="ModifierProfil"
                        component={EditProfileScreen}
                    />
                    <Stack.Screen
                        name="Profil"
                        component={ProfileScreen}
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
    )
}