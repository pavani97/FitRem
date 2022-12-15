import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import SelectList from "react-native-select-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

const SelectDurationDropdown = ({ onSelectedDuration, exerciseDuration }) => {
  const timeIntervel = [2, 10, 15, 30, 45, 60];

  return (
    <View>
      <Text style={styles.text}>How long will you exercise daily?</Text>
      <SelectList
        defaultButtonText="0"
        buttonStyle={styles.button}
        dropdownStyle={{ backgroundColor: "lightgray" }}
        data={timeIntervel}
        onSelect={(data) => onSelectedDuration(data)}
        defaultValue={exerciseDuration}
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
    fontSize: 19,
  },
});

export default SelectDurationDropdown;
