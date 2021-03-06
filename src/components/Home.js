import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Appbar, Card, DataTable, Button, TextInput } from "react-native-paper";
import React from "react";
import "../global.js";

export default function Home({ navigation }) {
  return (
    <ScrollView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Home" />
      </Appbar.Header>

      <Text
        style={styles.name}
        onPress={() => navigation.navigate("TeacherList")}
      >
        View Teachers
      </Text>
      <Text
        style={styles.name}
        onPress={() => navigation.navigate("StudentList")}
      >
        View Students
      </Text>
      <Text
        style={styles.name}
        onPress={() => navigation.navigate("StudentSearch")}
      >
        Student Search
      </Text>
      <Text
        style={styles.name}
        onPress={() => navigation.navigate("ClassList")}
      >
        View Classes
      </Text>

      <Text
        style={styles.name}
        onPress={() => navigation.navigate("AttendanceCreate", "1")}
      >
        Add Attendance
      </Text>
      <Text
        style={styles.name}
        onPress={() => navigation.navigate("AttendanceSearch")}
      >
        Attendance Search
      </Text>
      <Text style={styles.name} onPress={() => navigation.navigate("AASearch")}>
        Admin Attendance Search
      </Text>

      <Text
        style={styles.name}
        onPress={() => navigation.navigate("AdminHome")}
      >
        Card Home
      </Text>

      <Text style={styles.name} onPress={() => navigation.navigate("Login")}>
        Logout
      </Text>
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
    fontSize: 20,
    marginTop: 10,
  },
});
