import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import SelectList from "react-native-select-dropdown";

const BeepReaminder = () => {
  const timeIntervel = ["15 secs", "30 secs", "45 secs", "1 min", "1.15 min"];
  const [selected, setSelected] = useState("");

  return (
    <View>
      <Text h5 style={{ alignSelf: "center" }}>
        Interval for repeat steps
      </Text>
      <Text style={{ alignSelf: "center" }}>
        (your phone will beep on each time)
      </Text>
      <SelectList
        defaultButtonText="15 secs"
        buttonStyle={styles.button}
        dropdownStyle={{ backgroundColor: "lightgray" }}
        data={timeIntervel}
        setSelected={setSelected}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    marginTop: 10,
    borderWidth: 1,
    width: 120,
    alignSelf: "center",
    borderColor: "black",
    borderRadius: 10,
    borderStyle: "solid",
  },
});

export default BeepReaminder;
