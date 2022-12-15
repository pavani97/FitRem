import EditScreen from "./src/screens/EditScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CreateRemainderScreen from "./src/screens/CreateRemainderScreen";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import TimerElapseScreen from "./src/screens/TimerElapseScreen";
import ExerciseHistoryScreen from "./src/screens/ExerciseHistory";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const Stack = createStackNavigator();
const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("History");
      }}
    >
      <FontAwesome5 name="history" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Remainders List">
        <Stack.Screen
          name="Remainders List"
          options={{
            headerRight: () => <HeaderRight />,
            headerLeft: () => null,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          // options={{
          //   headerLeft: () => <HeaderLeft />,
          // }}
          name="CreateRemainder"
          component={CreateRemainderScreen}
        />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen
          name="TimerElapse"
          options={{
            headerLeft: () => null,
          }}
          component={TimerElapseScreen}
        />
        <Stack.Screen
          name="History"
          // options={{
          //   headerLeft: () => null,
          // }}
          component={ExerciseHistoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
