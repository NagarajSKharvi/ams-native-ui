import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const states = [
    { id: "1", description: "sd", done: false, targetDate: new Date() },
    { id: "2", description: "sd", done: false, targetDate: new Date() },
    { id: "2", description: "sd", done: false, targetDate: new Date() },
    { id: "2", description: "sd", done: false, targetDate: new Date() },
    { id: "2", description: "sd", done: false, targetDate: new Date() },
  ];

  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
