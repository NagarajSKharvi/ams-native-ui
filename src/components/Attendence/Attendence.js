import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  Provider,
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
} from "react-native-paper";

const attendanceUrl = "http://192.168.1.102:9999/ams/attendance/1";

export default function Attendence({ navigation }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getAllList = () => {
    fetch(attendanceUrl)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        console.log(json);
        setData(json.studentAttendanceResponses);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  };
  React.useEffect(() => {
    const reloadOnFocus = navigation.addListener("focus", () => {
      getAllList();
      console.log("called on focyus");
    });
    getAllList();
    return reloadOnFocus;
  }, []);

  const goBack = () => {
    navigation.navigate("Home");
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Attendence List" subtitle="Attendence" />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Card>
            <DataTable>
              <DataTable.Header style={styles.databeHeader}>
                <DataTable.Title>Roll Number</DataTable.Title>
                <DataTable.Title>Present</DataTable.Title>
              </DataTable.Header>
              {data.map((stud, i) => (
                <DataTable.Row style={styles.databeBox} key={i}>
                  <DataTable.Cell>{stud.rollNumber}</DataTable.Cell>
                  <DataTable.Cell>{stud.present ? "Yes" : "No"}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card>
        </View>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    fontSize: 15,
    fontSize: 35,
  },
  mainbox: {
    textAlign: "center",
    margin: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  databeBox: {
    margin: 2,
    textAlign: "left",
  },
  databeHeader: {
    margin: 10,
    textAlign: "left",
  },
});
