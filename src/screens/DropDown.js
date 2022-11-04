import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
export default class KA extends Component {
  state = {
    hand: "right",
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            color: "black",
            fontWeight: "900",
            fontSize: 18,
            padding: 30,
          }}
        >
          {" "}
          Scegli tipo{" "}
        </Text>
        <Picker
          selectedValue={this.state.hand}
          onValueChange={(hand) => this.setState({ hand })}
          style={{ width: 160, postion: "absolute", fontSize: 10 }}
          mode="dropdown"
          itemStyle={{
            color: "red",
            fontWeight: "900",
            fontSize: 18,
            padding: 30,
          }}
        >
          <Picker.Item label="Right Hand" value="right" />
          <Picker.Item label="Left Hand" value="left" />
        </Picker>
      </SafeAreaView>
    );
  }
}
