import React from "react";
import { Text, View, StyeSheet } from "react-native-elements";
import SelectDurationScreen from "./SelectDurationScreen";
const InitialScreen = () => {
  return (
    <>
      <Text style={{ margin: 80, fontSize: 20 }}>
        Welcome to remainder!!!!!
      </Text>
      <SelectDurationScreen />
    </>
  );
};
export default InitialScreen;
