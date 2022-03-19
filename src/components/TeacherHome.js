import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import { Appbar } from "react-native-paper";
import Cards from "./Cards";
const { width, height } = Dimensions.get("window");

export default function TeacherHome({ navigation, title, onPress }) {
  return (
    <ScrollView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Home" />
      </Appbar.Header>

      <View style={styles.container}>
        <Cards
          title="View Students"
          style={{
            backgroundColor: "dodgerblue",
          }}
          onPress={() => navigation.navigate("StudentList")}
        />
        <Cards
          title="Search Students"
          style={{
            backgroundColor: "lightgreen",
          }}
          onPress={() => navigation.navigate("StudentSearch")}
        />
        <Cards
          title="View Classes"
          style={{
            backgroundColor: "lightblue",
          }}
          onPress={() => navigation.navigate("ClassList")}
        />
        <Cards
          title="Attendance Search"
          style={{
            backgroundColor: "aquamarine",
          }}
          onPress={() => navigation.navigate("AttendanceSearch")}
        />
        <Cards
          title="Add Attendance"
          style={{
            backgroundColor: "#de5135",
          }}
          onPress={() => navigation.navigate("AttendanceCreate", "1")}
        />
        <Cards
          title="Logout"
          style={{
            backgroundColor: "dodgerblue",
          }}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    marginTop: Platform.OS === "android" ? 40 : 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});