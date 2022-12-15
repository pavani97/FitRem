import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import SelectList from "react-native-select-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

const BeepDurationDropdown = ({ beepDuration, onSelectedBeepDuration }) => {
  const timeIntervel = [1, 2, 5];

  return (
    <View>
      <Text style={styles.text}>Interval for repeat steps</Text>
      <Text style={{ alignSelf: "center" }}>
        (your phone will beep on each time)
      </Text>
      <SelectList
        defaultButtonText="0"
        buttonStyle={styles.button}
        dropdownStyle={{ backgroundColor: "lightgray" }}
        data={timeIntervel}
        onSelect={(data) => onSelectedBeepDuration(data)}
        defaultValue={beepDuration}
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

export default BeepDurationDropdown;
