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
import AsyncStorage from "@react-native-async-storage/async-storage";
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
          title="View Students"
          style={{
            backgroundColor: "lightgreen",
            width: width * 0.45,
          }}
          onPress={() => navigation.navigate("StudentList", { userType })}
        />
        <Cards
          title="View Teachers"
          style={{
            backgroundColor: "orange",
            width: width * 0.45,
          }}
          onPress={() => navigation.navigate("TeacherList", { userType })}
        />

        <Cards
          title="Search Students"
          style={{
            backgroundColor: "lightgreen",
            width: width * 0.45,
          }}
          onPress={() => navigation.navigate("StudentSearch")}
        />
        <Cards
          title="View Classes"
          style={{
            backgroundColor: "lightblue",
            width: width * 0.45,
          }}
          onPress={() => navigation.navigate("ClassList")}
        />
        <Cards
          title="Attendance Search"
          style={{
            backgroundColor: "aquamarine",
            width: width * 0.45,
          }}
          onPress={() => navigation.navigate("AASearch")}
        />
        <Cards
          title="Logout"
          style={{
            backgroundColor: "dodgerblue",
            width: width * 0.45,
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
    justifyContent: "center",
  },
});
