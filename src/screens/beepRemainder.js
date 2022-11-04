import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import SelectList from "react-native-select-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BeepDurationDropdown = () => {
  const timeIntervel = [
    "15 secs",
    "30 secs",
    "45 secs",
    "1 min",
    "1 m 15 s",
    "1 m 30 s",
    "1 m 45 s",
    "2 mins",
  ];
  const [selected, setSelected] = useState("");
  const remainderNotification = (selectedValue) => {
    console.log("from beep", selectedValue);
    setSelected(selectedValue);
    AsyncStorage.setItem("beeptime", selectedValue);
  };

  return (
    <View>
      <Text style={styles.text}>Interval for repeat steps</Text>
      <Text style={{ alignSelf: "center" }}>
        (your phone will beep on each time)
      </Text>
      <SelectList
        defaultButtonText="15 secs"
        buttonStyle={styles.button}
        dropdownStyle={{ backgroundColor: "lightgray" }}
        data={timeIntervel}
        onSelect={(data) => remainderNotification(data)}
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

export default BeepDurationDropdown;
