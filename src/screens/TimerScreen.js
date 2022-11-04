import React, { useState } from "react";
import { Button, Text, View } from "react-native-elements";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spacer from "../components/Spacer";
import BeepReaminder from "./beepRemainder";
import SelectDurationDropdown from "./SelectDurationDropdown";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TimerScreen = ({ navigation }) => {
  const [mydate, setDate] = useState(new Date());
  const [isDisplayDate, setShowDate] = useState(false);
  const [text, setText] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || mydate;
    setShowDate(false);
    setDate(currentTime);
    let tempDate = new Date(currentTime);
    let fTime =
      "Hours: " + tempDate.getHours() + " Minutes: " + tempDate.getMinutes();
    setText(fTime);
  };

  const displayTimepicker = () => {
    setShowDate(true);
  };
  const saveData = async () => {
    const val = JSON.stringify(mydate);
    AsyncStorage.setItem("_key_", val);
    try {
      const selectDuration = await AsyncStorage.getItem("durationtime");
      const beepRemainder = await AsyncStorage.getItem("beeptime");
      // console.log(selectDuration, beepRemainder);
      alert("Data saved!!!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Edit", {
            screen: "EditScreen",
            item: text,
          });
          // console.log(text);
        }}
      >
        <Feather
          style={{ marginLeft: "90%" }}
          name="edit"
          size={30}
          color="black"
        />
      </TouchableOpacity>

      <Spacer>
        <Text h5 style={styles.text}>
          At what time You want to Excercise daily?
        </Text>

        <Button
          buttonStyle={{ width: 150, marginTop: 10, alignSelf: "center" }}
          type="solid"
          onPress={displayTimepicker}
          title="SET TIME"
        />

        {isDisplayDate && (
          <DateTimePicker
            style={{ width: "100%" }}
            value={mydate}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={onChange}
          />
        )}

        <Text style={styles.text}>{text}</Text>
      </Spacer>
      <Spacer>
        <SelectDurationDropdown />
      </Spacer>
      <Spacer>
        <BeepReaminder />
      </Spacer>
      <Spacer />
      <Button
        onPress={saveData}
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
export default TimerScreen;
