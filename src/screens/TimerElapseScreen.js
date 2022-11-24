import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Audio } from "expo-av";

export default function TimerElapseScreen({ route, navigation }) {
  const { ExerciseDuration, BeepDuration } = route.params;
  var str = ExerciseDuration;
  var time = "";
  var parts = str.split(" ");
  for (var i = 0; i < parts.length; i++) {
    if (parseInt(parts[i].trim(), 10)) {
      time = parts[0];
    }
  }
  var str1 = BeepDuration;
  var beep = "";
  var parts1 = str1.split(" ");
  for (var i = 0; i < parts1.length; i++) {
    if (parseInt(parts1[i].trim(), 10)) {
      beep = parts1[0];
    }
  }

  const START_HOUR = 0;
  const START_SECOND = 59;
  let milliBeep = beep * 60000;

  const [repeat, isRepeat] = useState(milliBeep);
  const [currentHours, setHours] = useState(START_HOUR);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [currentMinutes, setMinutes] = useState(time);
  const [sound, setSound] = useState();
  const [isStop, setIsStop] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [fininsh, isFinish] = useState(false);
  const stopHandler = () => {
    setIsStop(true);
    setIsRunning(false);
  };
  const startHandler = () => {
    setIsRunning(true);
  };
  const resetHandler = () => {
    setIsStop(false);
    setIsRunning(false);
    isRepeat(0);
    setMinutes(time);
    setHours(START_HOUR);
    setSeconds(START_SECOND);
  };
  const resumeHandler = () => {
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
        console.log(repeat);
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

  const hrs = currentHours < 10 ? "0" + currentHours : currentHours;
  const min = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
  const secs = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
  return (
    <View>
      <View style={styles.timer}>
        <Text style={{ alignSelf: "center", fontSize: 40 }}>
          {hrs}:{min}:{secs}
        </Text>
      </View>
      <View style={styles.container}>
        {!isRunning && !isStop && (
          <Button onPress={startHandler} title="START" />
        )}
        {isRunning && !isStop && <Button onPress={stopHandler} title="PAUSE" />}
        {isStop && <Button onPress={resumeHandler} title="RESUME" />}
        <Button onPress={resetHandler} title="RESET" />
        <Button
          title="FINISH"
          disabled={!fininsh}
          onPress={() => navigation.navigate("FitnessRemainder")}
        />
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
