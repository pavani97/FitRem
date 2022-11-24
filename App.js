import EditScreen from "./src/screens/EditScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TimerElapseScreen from "./src/screens/TimerElapseScreen";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FitnessRemainder">
        <Stack.Screen name="FitnessRemainder" component={WelcomeScreen} />
        <Stack.Screen
          options={{
            headerLeft: () => null,
          }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="TimerElapse" component={TimerElapseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
