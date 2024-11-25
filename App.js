import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./pages/HomePage";
import CreateDestination from "./pages/CreateDestination";
import EditDestination from "./pages/EditDestination";
import DestinationInfo from "./pages/DestinationInfo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="CreateDestination"
          component={CreateDestination}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="EditDestination"
          component={EditDestination}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="DestinationInfo"
          component={DestinationInfo}
          options={{ headerShown: false, gestureEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
