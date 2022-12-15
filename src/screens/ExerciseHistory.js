import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Card } from "react-native-paper";
const ExerciseHistoryScreen = () => {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      let values = await AsyncStorage.getItem("HistoryList_key");
      let jsonList = JSON.parse(values);
      setData(jsonList);
      // console.log("from history screen", jsonList);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // const historyList = [
  //   {
  //     date: 1669076702000,
  //     timebreakdown: [
  //       {
  //         start: 1669076802000,
  //         end: 1669077802000,
  //       },
  //       {
  //         start: 1669078802000,
  //         end: 1669079508000,
  //       },
  //       // {
  //       //   start: 1669078802000,
  //       //   end: 1669208850483,
  //       // },
  //     ],
  //     scheduledMinutes: 30,
  //   },
  //   {
  //     date: 1669684770000,
  //     timebreakdown: [
  //       {
  //         start: 1669685770000,
  //         end: 1669687770000,
  //       },
  //     ],
  //     scheduledMinutes: 30,
  //   },
  //   {
  //     date: 1669239945000,
  //     timebreakdown: [
  //       {
  //         start: 1669258845000,
  //         end: 1669258955000,
  //       },
  //       {
  //         start: 1669259055000,
  //         end: 1669259555000,
  //       },
  //     ],
  //     scheduledMinutes: 15,
  //   },
  // ];
  // console.log("from history", data);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {data
          ? data.map((item, index) => {
              console.log("from history", Date.now(item.date));
              const actualDuration = item.timebreakdown
                .map((subitem) =>
                  moment(subitem.end).diff(subitem.start, "minutes")
                )
                .reduce((sum, item) => (sum += item));
              console.log("actual", actualDuration);
              const isCompleted = item.scheduledMinutes < actualDuration;
              return (
                <Card
                  key={index}
                  style={[
                    styles.card,
                    { backgroundColor: isCompleted ? "green" : "yellow" },
                  ]}
                >
                  <Card.Content>
                    <Text style={{ fontSize: 17, color: "black" }}>
                      Date: {moment(item.date).format("DD/MM/YYYY h:mm")}
                    </Text>
                  </Card.Content>
                  <Card.Content>
                    <Text style={{ fontSize: 17, color: "black" }}>
                      Actual Exercise Duration: {actualDuration}
                    </Text>
                  </Card.Content>
                  <Card.Content>
                    <Text style={{ fontSize: 17, color: "black" }}>
                      Scheduled Minutes:{item.scheduledMinutes}
                    </Text>
                  </Card.Content>
                </Card>
              );
            })
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    width: 350,
    alignSelf: "center",
    height: 100,
    margin: 7,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  //   card1: {
  //     width: 350,
  //     alignSelf: "center",
  //     height: 90,
  //     margin: 7,
  //     backgroundColor: "yellow",
  //   },
  loader: {
    width: "100%",
    height: "100%",
    display: "flex",
    marginTop: 20,
  },
});
export default ExerciseHistoryScreen;
