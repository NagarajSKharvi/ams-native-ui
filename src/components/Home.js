import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { Provider, Appbar } from "react-native-paper";
import React from "react";

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
      <Text onPress={() => navigation.navigate("DataPage")}>View Teachers</Text>
      <Text onPress={() => navigation.navigate("StudentEdit")}>
        Edit Student
      </Text>
      <Text onPress={() => navigation.navigate("StudentList")}>
        View Students
      </Text>
      <Text onPress={() => navigation.navigate("Login")}>View Students</Text>
      <Text onPress={() => navigation.navigate("")}>Logout</Text>
    </ScrollView>
    // <ScrollView>
    //   <View style={styles.container}>
    //     <Card>
    //       <Card.Title>Welcome to UVCE College of Engineering</Card.Title>
    //     </Card>
    //   </View>

    //   <Text onPress={() => navigation.navigate("DataPage")}>View Teachers</Text>
    //   <Text onPress={() => navigation.navigate("StudentEdit")}>
    //     Edit Student
    //   </Text>
    //   <Text onPress={() => navigation.navigate("StudentList")}>
    //     View Students
    //   </Text>
    //   <Text onPress={() => navigation.navigate("Login")}>View Students</Text>
    //   <Text onPress={() => navigation.navigate("")}>Logout</Text>
    // </ScrollView>
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
