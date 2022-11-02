import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

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
  return (
    <View style={styles.view}>
      <Text style={styles.text}>How long you will excercise?</Text>
      <View style={styles.drop}>
        <SelectDropdown
          defaultButtonText="15min"
          buttonStyle={styles.dropdown}
          dropdownStyle={styles.dropdownList}
          data={timeIntervel}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    fontSize: 40,
    margin: 90,
    marginLeft: 95,
    paddingBottom: 30,
  },
  text: {
    paddingBottom: 10,
  },
  dropdown: {
    backgroundColor: "rgb(0,200,255)",
    width: 100,
    padding: 0,
    marginLeft: 70,
    text: {
      marginLeft: 35,
    },
    borderRadius: 10,
  },
  drop: {
    backgroundColor: "rgb(0,150,255)",
    width: 100,
    padding: 0,
    marginLeft: 50,
    text: {
      marginLeft: 35,
    },
    borderRadius: 10,
  },
  dropdownList: {
    backgroundColor: "rgb(255,255,255)",
  },
});
export default SelectDurationScreen;
