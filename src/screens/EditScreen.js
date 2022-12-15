import React, { useState } from "react";
import { Button, Text, View } from "react-native-elements";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import Spacer from "../components/Spacer";
import BeepDurationDropdown from "../components/beepRemainder";
import SelectDurationDropdown from "../components/SelectDurationDropdown";
import { TimePicker } from "react-native-simple-time-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditScreen = ({ route, navigation }) => {
  const { mydate, exerciseDuration, beepDuration, index } = route.params;
  const [mydate1, setDate] = useState(mydate);
  const [exerciseDuration1, setExerciseDuration] = useState(exerciseDuration);
  const [beepDuration1, setBeepDuration] = useState(beepDuration);

  const handleChange = (e) => {
    setDate(e);
    setEditedTimeValue(e);
  };
  const setEditedDuration = (e) => {
    setExerciseDuration(e);
  };
  const setEditedBeepDuration = (e) => {
    setBeepDuration(e);
  };
  const setEditedTimeValue = (e) => {
    setDate(e);
  };

  const storeData = async () => {
    let items = {
      storedDateValue: mydate1,
      storedExerciseValue: exerciseDuration1,
      storedBeepValue: beepDuration1,
    };
    try {
      let temp = JSON.parse(await AsyncStorage.getItem("Remainderslist_key"));
      temp[index] = items;
      await AsyncStorage.setItem("Remainderslist_key", JSON.stringify(temp));
    } catch (e) {}
    navigation.navigate("Remainders List", { index });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer>
        <Text h5 style={styles.text}>
          At what time You want to Excercise daily?
        </Text>

        <TimePicker isAmpm value={mydate1} onChange={handleChange} />
      </Spacer>
      <Spacer>
        <SelectDurationDropdown
          exerciseDuration={exerciseDuration}
          onSelectedDuration={setEditedDuration}
        />
      </Spacer>
      <Spacer>
        <BeepDurationDropdown
          beepDuration={beepDuration}
          onSelectedBeepDuration={setEditedBeepDuration}
        />
      </Spacer>
      <Spacer />

      <Button
        onPress={storeData}
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
export default EditScreen;
