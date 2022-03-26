import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { Appbar } from "react-native-paper";
import Cards from "./Cards";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

export default function TeacherHome({ navigation }) {
  const [userType, setUserType] = useState();
  const [uId, setUId] = useState(null);

  React.useEffect(() => {
    readData();
  }, [uId]);

  const readData = async () => {
    try {
      const ut = await AsyncStorage.getItem("userType");
      const uid = await AsyncStorage.getItem("userId");
      setUserType(ut);
      setUId(uid);
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  return (
    <ScrollView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Home" />
      </Appbar.Header>

      <View style={styles.container}>
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
          onPress={() => navigation.navigate("TASearch", { teachId: uId })}
        />
        <Cards
          title="Add Attendance"
          style={{
            backgroundColor: "#de5135",
          }}
          onPress={() =>
            navigation.navigate("AttendanceCreate", { userType, uId })
          }
        />
        <Cards
          title="Logout"
          style={{
            backgroundColor: "dodgerblue",
          }}
          onPress={() => {
            clearStorage();
            navigation.navigate("Login");
          }}
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
