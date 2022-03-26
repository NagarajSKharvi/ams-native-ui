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

export default function AAGet({ route, navigation }) {
  const { aId, teachId, source } = route.params;
  const [data, setData] = React.useState();
  const [studs, setStuds] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log(aId);
    fetch(global.hostUrl + `/attendance/${aId}`)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        console.log(json);
        setData(json);
        setStuds(json.studentAttendanceResponses);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  }, []);

  const goBack = () => {
    if (source === "TASearch") {
      navigation.navigate(source, { teachId });
    } else {
      navigation.navigate(source);
    }
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Attendance View" subtitle="Attendance" />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Card>
            <DataTable>
              <DataTable.Header style={styles.databeHeader}>
                <DataTable.Title>Roll Number</DataTable.Title>
                <DataTable.Title>Present</DataTable.Title>
              </DataTable.Header>
              {studs.map((stud, i) => (
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
