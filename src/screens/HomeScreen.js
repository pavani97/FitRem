import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import NotificationsRemainders from "../../Utility/Utils";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen({ route, navigation }) {
  const [data, setData] = useState([]);

  // const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      let values = await AsyncStorage.getItem("Remainderslist_key");
      let jsonList = JSON.parse(values);
      setData(jsonList);
      // console.log("fromjsonlist", jsonList);
    } catch (e) {
      console.log(e);
    }
    return values;
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      // console.log("usefocus");
    })
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text style={{ alignSelf: "center", fontSize: 20 }}>Remainder List</Text> */}
      <ScrollView>
        {data ? (
          data.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate("Edit", {
                    mydate: item.storedDateValue,
                    exerciseDuration: item.storedExerciseValue,
                    beepDuration: item.storedBeepValue,
                    index: i,
                  })
                }
                style={styles.card}
              >
                <Card>
                  <Text style={{ fontSize: 25, color: "black" }}>
                    {item.storedDateValue.hours} :{" "}
                    {item.storedDateValue.minutes} {item.storedDateValue.ampm}
                  </Text>

                  <Text>{item.storedExerciseValue + " " + "mins"}</Text>
                </Card>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={{ alignSelf: "center", fontSize: 26, margin: 10 }}>
            NO DATA TO DISPLAY!!!
          </Text>
        )}
      </ScrollView>
      <NotificationsRemainders />
      <TouchableOpacity onPress={() => navigation.navigate("CreateRemainder")}>
        <Entypo
          style={{ marginLeft: 320, marginBottom: 30 }}
          name="circle-with-plus"
          size={50}
          color="black"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    cursor: "pointer",
    width: 350,
    alignSelf: "center",
    height: 90,
    margin: 7,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 40,
  },
  loader: {
    width: "100%",
    height: "100%",
    display: "flex",
    marginTop: 20,
  },
});
export default HomeScreen;
