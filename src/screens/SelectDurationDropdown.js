import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import SelectList from "react-native-select-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectDurationDropdown = () => {
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

  const selectedTimerValue = (selectedValue) => {
    console.log("from select", selectedValue);
    setSelected(selectedValue);
    AsyncStorage.setItem("durationtime", selectedValue);
  };

  return (
    <View>
      <Text h5 style={{ alignSelf: "center" }}>
        How long will you exercise daily?
      </Text>
      <SelectList
        defaultButtonText="15 secs"
        buttonStyle={styles.button}
        dropdownStyle={{ backgroundColor: "lightgray" }}
        data={timeIntervel}
        onSelect={(data) => selectedTimerValue(data)}
        defaultValue={selected}
        renderDropdownIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="caretdown"
            size={20}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    marginTop: 10,
    borderWidth: 1,
    width: 140,
    alignSelf: "center",
    borderColor: "black",
    borderRadius: 10,
    borderStyle: "solid",
  },
  text: {
    alignSelf: "center",
    fontSize: 20,
  },
});

export default SelectDurationDropdown;
