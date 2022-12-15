import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, LogBox } from "react-native";
import { Button } from "react-native-elements";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default function TimerElapseScreen({ route, navigation }) {
  const { ExerciseDuration, BeepDuration, myDate } = route.params;
  const START_HOUR = 0;
  const START_SECOND = 0;
  let milliBeep = BeepDuration * 60000;

  const [repeat, isRepeat] = useState(milliBeep);
  const [currentHours, setHours] = useState(START_HOUR);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [currentMinutes, setMinutes] = useState(ExerciseDuration);
  const [sound, setSound] = useState();
  const [isStop, setIsStop] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [fininsh, isFinish] = useState(false);
  const [timer, setTimer] = useState([]);

  const pauseHandler = () => {
    const newArray = [...timer];
    newArray[newArray.length - 1].end = Date.now();
    setTimer(newArray);
    isFinish(true);
    setIsStop(true);
    setIsRunning(false);
  };
  const startHandler = () => {
    const newArray = [...timer];
    newArray.push({ start: Date.now() });
    console.log('from start',newArray);
    setTimer(newArray);
    setIsRunning(true);
  };
  const resetHandler = () => {
    setIsStop(false);
    setIsRunning(false);
    isRepeat(0);
    setMinutes(ExerciseDuration);
    setHours(START_HOUR);
    isFinish(false);
    setSeconds(START_SECOND);
  };
  const resumeHandler = async () => {
    const newArray = [...timer];
    newArray.push({ start: Date.now() });
    setTimer(newArray);
    isFinish(false);
    setIsRunning(true);
    setIsStop(false);
  };
  useEffect(() => {
    if (isRunning === true) {
      const interval = setInterval(() => {
        setSeconds(currentSeconds - 1);
        if (currentSeconds === 0) {
          setSeconds(59);
          setMinutes(currentMinutes - 1);
        }
        if (currentMinutes === 0) {
          setMinutes(59);
          setHours(currentHours - 1);
        }
        if (currentHours === 0 && currentMinutes === 0) {
          setHours(0);
          setMinutes(0);
        }
        if (
          currentHours === 0 &&
          currentMinutes === 0 &&
          currentSeconds === 0
        ) {
          setSeconds(0);
          isFinish(true);
        }
        isRepeat((v) => v - 1000);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  });
  useEffect(() => {
    if (repeat == 0) {
      isRepeat(milliBeep);
      playSound();
    }
  });

  const saveData = async () => {
    var items = {
      date: Date.now(myDate),
      timebreakdown: timer,
      scheduledMinutes: ExerciseDuration,
    };
    try {
      const values = await AsyncStorage.getItem("HistoryList_key");
      let storedHistoryValues = JSON.parse(values);
      const historyValues = storedHistoryValues
        ? [...storedHistoryValues, items]
        : [items];
      await AsyncStorage.setItem(
        "HistoryList_key",
        JSON.stringify(historyValues)
      );
      console.log("from store", historyValues);
      await AsyncStorage.setItem("History_Key", JSON.stringify(items));
    } catch (e) {}
    navigation.navigate("Remainders List");
    const newArray = [...timer];
    newArray[newArray.length - 1].end = Date.now();
    console.log('from finish',newArray);
    setTimer(newArray);
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/beep-sound.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const min = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
  const secs = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;

  return (
    <View>
      <View style={styles.timer}>
        <Text style={{ alignSelf: "center", fontSize: 40 }}>
          {min}:{secs}
        </Text>
      </View>
      <View style={styles.container}>
        {!isRunning && !isStop && (
          <Button onPress={startHandler} title="START" />
        )}
        {isRunning && !isStop && (
          <Button onPress={pauseHandler} title="PAUSE" />
        )}
        {isStop && <Button onPress={resumeHandler} title="RESUME" />}
        <Button onPress={resetHandler} title="RESET" />
        <Button title="FINISH" disabled={!fininsh} onPress={saveData} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 250,
    justifyContent: "space-evenly",
    alignSelf: "center",
    marginTop: 50,
    flexDirection: "row",
  },
  timer: {
    width: 300,
    height: 300,
    marginTop: 60,
    backgroundColor: "skyblue",
    display: "flex",
    borderRadius: 151,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  button: {
    width: 100,
    marginTop: 30,
    alignSelf: "center",
    textColor: "black",
    backgroundColor: "lightblue",
  },
});
