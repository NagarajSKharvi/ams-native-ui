import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { Provider, Appbar } from "react-native-paper";
import React from "react";
import "../global.js";

const { width, height } = Dimensions.get("window");

const sections = [
  {
    name: "Teachers",
    task: "StudentList",
  },
  {
    name: "Students",
    task: "StudentList",
  },
  {
    name: "Admin",
    task: "Login",
  },
];

export default function Home({ navigation }) {
  const onClickButton = (values) => {
    if (values === 1) {
      console.log("Success");
      navigation.navigate("DataPage");
    } else {
      console.log("Failes");
      navigation.navigate("DataPage");
    }
  };

  return (
    <ScrollView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <Text onPress={() => navigation.navigate("TeacherList")}>
        View Teachers
      </Text>

      <Text onPress={() => navigation.navigate("StudentList")}>
        View Students
      </Text>
      <Text onPress={() => navigation.navigate("AttendanceList")}>
        View Attendance
      </Text>
      <Text onPress={() => navigation.navigate("ClassList")}>View Classes</Text>
      <Text>Check</Text>
      <Text>Check</Text>
      <Text>Check</Text>

      <Text>Check</Text>
      <Text onPress={() => navigation.navigate("SubjectList", "1")}>
        View Subject
      </Text>
      <Text onPress={() => navigation.navigate("AttendanceCreate")}>
        Add Attendance
      </Text>
      <Text onPress={() => navigation.navigate("Login")}>Logout</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});
