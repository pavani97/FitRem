import React, { useEffect, useState, useRef } from "react";
import { Button, Text } from "react-native-elements";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { TimePicker } from "react-native-simple-time-picker";
import Spacer from "../components/Spacer";
import BeepDurationDropdown from "../components/beepRemainder";
import SelectDurationDropdown from "../components/SelectDurationDropdown";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
Notifications.setNotificationCategoryAsync("welcome", [
  {
    buttonTitle: "Start",
    identifier: "first",
    options: {
      opensAppToForeground: true,
    },
  },

  {
    buttonTitle: "Reject",
    identifier: "second",
    options: {
      opensAppToForeground: false,
    },
  },
  {
    buttonTitle: "Delay 5 minutes",
    identifier: "third",
    options: {
      opensAppToForeground: false,
    },
  },
]);

const HomeScreen = ({ navigation }) => {
  const [mydate, setDate] = useState();
  const [exerciseDuration, setExerciseDuration] = useState();
  const [beepDuration, setBeepDuration] = useState();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();
  const onSelectedDuration = (e) => {
    setExerciseDuration(e);
  };
  const onSelectedBeepDuration = (e) => {
    setBeepDuration(e);
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
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("from notification", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("opened");
        // console.log("from repsonse", response);
        Notifications.getNotificationCategoriesAsync().then((categories) => {
          // console.log("from categories", categories[0].actions[2]);
          if (response.actionIdentifier === "first") {
            navigation.navigate("TimerElapse", {
              ExerciseDuration:
                response.notification.request.content.data.exerciseDuration,
              BeepDuration:
                response.notification.request.content.data.beepDuration,
            });
            Notifications.dismissAllNotificationsAsync();
          } else if (response.actionIdentifier === "second") {
            BackHandler.exitApp();
            Notifications.dismissAllNotificationsAsync();
          } else if (response.actionIdentifier === "third") {
            console.log("third....");
            Notifications.dismissAllNotificationsAsync();
            delayNotification();
          }
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  const storeData = async () => {
    var items = {
      storedDateValue: mydate,
      storedExerciseValue: exerciseDuration,
      storedBeepValue: beepDuration,
    };
    try {
      await AsyncStorage.setItem("Notifications_Key", JSON.stringify(items));
    } catch (e) {}
  };

  const readData = async () => {
    const value = await AsyncStorage.getItem("Notifications_Key");
    try {
      if (value !== null) {
        let storedValues = JSON.parse(value);
        setDate(storedValues.storedDateValue);
        setExerciseDuration(storedValues.storedExerciseValue);
        setBeepDuration(storedValues.storedBeepValue);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    readData();
  }, []);

  const [notifications, setNotifications] = useState();
  const saveData = async () => {
    storeData();
    const values = await AsyncStorage.getItem("Notifications_Key");
    let datestoredValues = JSON.parse(values);
    const dateConvert =
      datestoredValues.storedDateValue.ampm == "pm"
        ? datestoredValues.storedDateValue.hours + 12
        : datestoredValues.storedDateValue.hours;
    const lastnotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        autoDismiss: true,
        title: "Exercise Time!!!",
        body: " START ",
        color: "blue",
        sound: "default",
        vibrate: [0, 255, 255, 255],
        categoryIdentifier: "welcome",
        data: {
          exerciseDuration: exerciseDuration,
          beepDuration: beepDuration,
        },
      },
      trigger: {
        hour: dateConvert,
        minute: mydate.minutes,
        repeats: true,
      },
    });
    setNotifications(lastnotificationId);
    await Notifications.cancelScheduledNotificationAsync(notifications);
    alert("Remainder was set!!!!");
    setShowIcon(true);
  };

  const delayNotification = async () => {
    const values = await AsyncStorage.getItem("Notifications_Key");
    let delayValues = JSON.parse(values);
    await Notifications.scheduleNotificationAsync({
      content: {
        autoDismiss: true,
        title: "Exercise Time!!!",
        body: " WELCOME BACK. ",
        color: "blue",
        sound: "default",
        vibrate: [0, 255, 255, 255],
        categoryIdentifier: "welcome",
        data: {
          exerciseDuration: delayValues.storedExerciseValue,
          beepDuration: delayValues.storedBeepValue,
        },
      },
      trigger: {
        seconds: 60 * 1,
        repeats: false,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Edit", {
            screen: "EditScreen",
            mydate: mydate,
            exerciseDuration: exerciseDuration,
            setEditedBeepDuration: setEditedBeepDuration,
            beepDuration: beepDuration,
            setEditedDuration: setEditedDuration,
            setEditedTimeValue: setEditedTimeValue,
          });
        }}
      >
        {showIcon && (
          <Feather
            style={{ marginLeft: "90%" }}
            name="edit"
            size={30}
            color="black"
          />
        )}
      </TouchableOpacity>

      <Spacer>
        <Text h5 style={styles.text}>
          At what time You want to Excercise daily?
        </Text>

        <TimePicker
          isAmpm
          value={mydate}
          onChange={(e) => {
            setDate(e);
          }}
        />
      </Spacer>
      <Spacer>
        <SelectDurationDropdown
          exerciseDuration={exerciseDuration}
          onSelectedDuration={onSelectedDuration}
        />
      </Spacer>
      <Spacer>
        <BeepDurationDropdown
          beepDuration={beepDuration}
          onSelectedBeepDuration={onSelectedBeepDuration}
        />
      </Spacer>
      <Spacer />
      <Button
        onPress={async () => {
          await saveData();
        }}
        disabled={!mydate || !exerciseDuration || !beepDuration}
        buttonStyle={{ width: 150, marginTop: 10, alignSelf: "center" }}
        title="SAVE"
      />
    </SafeAreaView>
  );
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

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
export default HomeScreen;
