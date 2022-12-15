import React, { useState } from "react";
import { Button, Text } from "react-native-elements";
import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { TimePicker } from "react-native-simple-time-picker";
import Spacer from "../components/Spacer";
import BeepDurationDropdown from "../components/beepRemainder";
import SelectDurationDropdown from "../components/SelectDurationDropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateRemainderScreen = ({ navigation }) => {
  const [mydate, setDate] = useState();
  const [exerciseDuration, setExerciseDuration] = useState();
  const [beepDuration, setBeepDuration] = useState();

  const onSelectedDuration = (e) => {
    setExerciseDuration(e);
  };
  const onSelectedBeepDuration = (e) => {
    setBeepDuration(e);
  };

  const storeData = async () => {
    var items = {
      storedDateValue: mydate,
      storedExerciseValue: exerciseDuration,
      storedBeepValue: beepDuration,
    };

    try {
      const values = await AsyncStorage.getItem("Remainderslist_key");
      let storedRemainderValues = JSON.parse(values);
      const remainderValues = storedRemainderValues
        ? [...storedRemainderValues, items]
        : [items];

      await AsyncStorage.setItem(
        "Remainderslist_key",
        JSON.stringify(remainderValues)
      );

      await AsyncStorage.setItem("Notifications_Key", JSON.stringify(items));
    } catch (e) {}
  };

  const saveData = async () => {
    navigation.navigate("Remainders List");
    storeData();
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Edit", {
            screen: "EditScreen",
            mydate: mydate,
            exerciseDuration: exerciseDuration,
            beepDuration: beepDuration,
          });
        }}
      ></TouchableOpacity>

      <Spacer>
        <Text h5 style={styles.text}>
          At what time You want to Excercise daily?
        </Text>

        <TimePicker
          isAmpm
          defaultValue={{ hours: 1, minutes: 0, ampm: "am" }}
          onChange={(e) => {
            setDate(e);
          }}
        />
      </Spacer>
      <Spacer>
        <SelectDurationDropdown onSelectedDuration={onSelectedDuration} />
      </Spacer>
      <Spacer>
        <BeepDurationDropdown onSelectedBeepDuration={onSelectedBeepDuration} />
      </Spacer>
      <Spacer />
      <Button
        onPress={saveData}
        disabled={!mydate || !exerciseDuration || !beepDuration}
        buttonStyle={{ width: 150, marginTop: 10, alignSelf: "center" }}
        title="SAVE"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  welText: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 30,
  },
  text: {
    alignSelf: "center",
    fontSize: 18,
  },
});
export default CreateRemainderScreen;
