import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform, View, Text } from "react-native";
import Constants from "expo-constants";
import storage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const NotificationScreen = () => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const reponseListner = useRef();
  useEffect(() => {
    const getPermission = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Enable push Notifications to use app");
          await storage.setItem("expopushtoken", "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem("expopushtoken", token);
      } else {
        alert("Must be a Physical device to use");
      }
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    getPermission();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);
  const onClick = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Title",
        body: "body",
        data: { data: "data goes here" },
      },
      trigger: {
        hour: 11,
        minute: 10,
        repeats: true,
      },
    });
  };
  return (
    <View>
      <TouchableOpacity onPress={onClick}>
        <Text style={{ backgroundColor: "red" }}>Click me </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationScreen;
