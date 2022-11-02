import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import SelectList from "react-native-select-dropdown";

const SelectDurationScreen = () => {
  const timeIntervel = [
    "15min",
    "30min",
    "45min",
    "1hr",
    "1hr 15min",
    "1hr 30min",
    "1hr 45min",
    "2hrs",
  ];
  const [selected, setSelected] = useState("");

  return (
    <View>
      <Text h5 style={{ alignSelf: "center" }}>
        How long will you exercise daily?
      </Text>

      <SelectList
        defaultButtonText="15 min"
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

export default SelectDurationScreen;
