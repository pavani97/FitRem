import React, { useCallback, useRef, useEffect, useState } from "react";
import { View, Animated, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const anim = useRef(new Animated.Value(1));

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 2000,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 2000,
        }),
      ])
    ).start();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ alignItems: "center", marginTop: 50 }}
      onLayout={onLayoutRootView}
    >
      <Text h2 style={{ marginBottom: 40 }}>
        Welcome
      </Text>
      <Animated.View style={{ transform: [{ scale: anim.current }] }}>
        <Ionicons
          style={{ alignSelf: "center", alignSelf: "center" }}
          name="fitness"
          size={50}
          color="red"
        />
      </Animated.View>
      <TouchableOpacity onPress={() => navigation.navigate("SetRemainder")}>
        <Text
          style={{
            fontSize: 20,
            color: "blue",
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          Lets Go
          <Entypo name="rocket" style={{ margin: 3 }} size={30} />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
