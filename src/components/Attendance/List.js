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
  const { cId, sId, subId } = route.params;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const studData = {
      subjectId: `${subId}`,
    };
    fetch(global.hostUrl + `/attendance/list`, {
      method: "POST",
      body: JSON.stringify(studData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  }, []);

  const goBack = () => {
    navigation.navigate("SubjectList", { cId, sId });
  };

  const attendanceView = (aId) => {
    console.log(aId);
    navigation.navigate("AttendanceView", { cId, sId, subId, aId });
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Attendance List" subtitle="Attendance" />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Card>
            <DataTable>
              <DataTable.Header style={styles.databeHeader}>
                <DataTable.Title>Class</DataTable.Title>
                <DataTable.Title>Section</DataTable.Title>
                <DataTable.Title>Subject</DataTable.Title>

                <DataTable.Title>Date Taken</DataTable.Title>
              </DataTable.Header>
              {data.map((att, i) => (
                <DataTable.Row
                  style={styles.databeBox}
                  key={i}
                  onPress={() => attendanceView(att.attendanceId)}
                >
                  <DataTable.Cell>
                    {att.sectionSubject.classSection.studClass.className}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {att.sectionSubject.classSection.sectionName}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {att.sectionSubject.subjectName}
                  </DataTable.Cell>
                  <DataTable.Cell>{att.date}</DataTable.Cell>
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
