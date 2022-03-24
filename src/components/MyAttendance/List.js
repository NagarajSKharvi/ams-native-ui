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

export default function List({ route, navigation }) {
  const { userType, uId } = route.params;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(global.hostUrl + `/attendance/student/${uId}`)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  }, []);

  const goBack = () => {
    if (userType === "student") {
      navigation.navigate("StudentHome");
    } else if (userType === "teacher") {
      navigation.navigate("TeacherHome");
    } else {
      navigation.navigate("AdminHome");
    }
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="My Attendance List" subtitle="Attendance" />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Card>
            <DataTable>
              <DataTable.Header style={styles.databeHeader}>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Period Time</DataTable.Title>
                <DataTable.Title>Subject</DataTable.Title>
                <DataTable.Title>Teacher</DataTable.Title>
                <DataTable.Title>Presence</DataTable.Title>
              </DataTable.Header>
              {data.map((att, i) => (
                <DataTable.Row style={styles.databeBox} key={i}>
                  <DataTable.Cell style={{ flex: 1.5 }}>
                    {att.date}
                  </DataTable.Cell>
                  <DataTable.Cell>{att.fromTime}</DataTable.Cell>
                  <DataTable.Cell>{att.subjectName}</DataTable.Cell>
                  <DataTable.Cell>{att.teacherName}</DataTable.Cell>
                  <DataTable.Cell>{att.isPresent}</DataTable.Cell>
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
    height: 100,
  },
  databeHeader: {
    margin: 10,
    textAlign: "left",
  },
});
