import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

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

export default function NotificationsRemainders() {
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useFocusEffect(
    useCallback(() => {
      recieveNotification();
    }, [])
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        // console.log("from notification", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("opened");
        // console.log("from repsonse", response);
        Notifications.getNotificationCategoriesAsync().then((categories) => {
          //   console.log("from categories", categories[0].actions[0]);
          if (response.actionIdentifier === "first") {
            navigation.navigate("TimerElapse", {
              myDate: response.notification.request.content.data.mydate,
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
            // console.log("third....");
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

  const recieveNotification = async () => {
    const values = await AsyncStorage.getItem("Remainderslist_key");
    let jsonValues = JSON.parse(values);
    jsonValues
      ? jsonValues.map(async (item) => ({
          scheduleNotification: await Notifications.scheduleNotificationAsync({
            content: {
              autoDismiss: true,
              title: "Exercise Time!!!",
              body: " START ",
              color: "blue",
              sound: "default",
              vibrate: [0, 255, 255, 255],
              categoryIdentifier: "welcome",
              data: {
                mydate: item?.storedDateValue,
                exerciseDuration: item?.storedExerciseValue,
                beepDuration: item?.storedBeepValue,
              },
            },
            trigger: {
              hour:
                item?.storedDateValue?.hours == "12" &&
                item?.storedDateValue?.ampm == "pm"
                  ? item?.storedDateValue?.hours
                  : item?.storedDateValue?.ampm == "pm"
                  ? item?.storedDateValue?.hours + 12
                  : item?.storedDateValue?.hours,
              minute: item?.storedDateValue.minutes,
              repeats: true,
            },
          }),
        }))
      : {};
  };

  const delayNotification = async () => {
    const values = await AsyncStorage.getItem("Remainderslist_key");
    let jsonValues = JSON.parse(values);
    jsonValues
      ? jsonValues.map(async (item) => ({
          scheduleNotification: await Notifications.scheduleNotificationAsync({
            content: {
              autoDismiss: true,
              title: "WELCOME BACK!!!!!",
              body: " START ",
              color: "blue",
              sound: "default",
              vibrate: [0, 255, 255, 255],
              categoryIdentifier: "welcome",
              data: {
                mydate: item?.storedDateValue,
                exerciseDuration: item?.storedExerciseValue,
                beepDuration: item?.storedBeepValue,
              },
            },
            trigger: {
              seconds: 60 * 1,
              repeats: false,
            },
          }),
        }))
      : {};
  };
}
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
