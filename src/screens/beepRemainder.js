import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
const BeepReaminder = () => {
  return (
    <View>
      <Text h5 style={{ marginTop: 60, alignSelf: "center" }}>
        Interval for repeat steps
      </Text>
      <Text style={{ alignSelf: "center" }}>
        (your phone will beep on each time)
      </Text>
    </View>
  );
};

export default BeepReaminder;
