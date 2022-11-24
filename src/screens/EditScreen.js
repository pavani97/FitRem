import React, { useState } from "react";
import { Button, Text, View } from "react-native-elements";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import Spacer from "../components/Spacer";
import BeepDurationDropdown from "../components/beepRemainder";
import SelectDurationDropdown from "../components/SelectDurationDropdown";
import { TimePicker } from "react-native-simple-time-picker";

const EditScreen = ({ route, navigation }) => {
  const {
    mydate,
    exerciseDuration,
    beepDuration,
    setEditedDuration,
    setEditedBeepDuration,
    setEditedTimeValue,
  } = route.params;

  const [mydate1, setDate] = useState(mydate);

  const handleChange = (e) => {
    setDate(e);
    setEditedTimeValue(e);
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
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
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
