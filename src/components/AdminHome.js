import React, { useState } from "react";
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
import AsyncStorage from "@react-native-community/async-storage";
const { width, height } = Dimensions.get("window");

export default function AdminHome({ navigation, title, onPress }) {
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
          title="View Teachers"
          style={{
            backgroundColor: "orange",
          }}
          onPress={() => navigation.navigate("TeacherList", { userType })}
        />
        <Cards
          title="View Students"
          style={{
            backgroundColor: "dodgerblue",
          }}
          onPress={() => navigation.navigate("StudentList", { userType })}
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
          onPress={() => navigation.navigate("AASearch")}
        />

        <Cards
          title="Create Account"
          style={{
            backgroundColor: "lightgreen",
          }}
          onPress={() => {}}
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
