import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { AppStateProvider } from "./src/context/AppStateContext";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { LandmarkDetailScreen } from "./src/screens/LandmarkDetailScreen";
import { RouteDetailScreen } from "./src/screens/RouteDetailScreen";

export type RootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  LandmarkDetail: { landmarkId: string };
  RouteDetail: { routeId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AppStateProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false, animation: "fade" }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Main" component={AppNavigator} />
            <Stack.Screen
              name="LandmarkDetail"
              component={LandmarkDetailScreen}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="RouteDetail"
              component={RouteDetailScreen}
              options={{ animation: "slide_from_right" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppStateProvider>
  );
}
