import React, { useState } from "react";
import { Button, Text, View } from "react-native-elements";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spacer from "../components/Spacer";
import BeepReaminder from "./beepRemainder";
const InitialScreen = () => {
  const [mydate, setDate] = useState(new Date());
  const [displaymode, setMode] = useState("time");
  const [isDisplayDate, setShow] = useState(false);
  const [text, setText] = useState(false);
  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fTime =
      "Hours: " + tempDate.getHours() + " Minutes: " + tempDate.getMinutes();
    setText(fTime);
    // console.log("Selected time :", fTime);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const displayTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView>
      <Spacer />
      <Text h3 style={styles.welText}>
        Welcome
      </Text>
      <Spacer />
      <Text style={styles.text}>At what time You want to Excercise daily?</Text>

      <Button
        style={styles.button}
        onPress={displayTimepicker}
        title="SET TIME"
      />

      {isDisplayDate && (
        <DateTimePicker
          style={{ width: "100%" }}
          value={mydate}
          mode={displaymode}
          is24Hour={true}
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={changeSelectedDate}
        />
      )}

      <Text style={styles.text}>{text}</Text>
      <Spacer />
      <Text style={styles.text}>How long will you exercise?</Text>
      <Spacer />
      <BeepReaminder />
      <Spacer />
      <Spacer />
      <Button title="save" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welText: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 30,
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
  },
  button: {
    alignSelf: "center",
  },
});
export default InitialScreen;
