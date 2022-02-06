import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function Home() {
  return (
    <View
      style={{
        height,
      }}
    >
      <Text>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
