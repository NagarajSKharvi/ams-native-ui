import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  Provider,
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
} from "react-native-paper";

const List = ({ route, navigation }) => {
  const { sId } = route.params;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(global.hostUrl + `/ams/subject/${sId}`)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  }, []);

  const goBack = () => {
    navigation.navigate("ClassList");
  };

  const viewStudents = () => {
    navigation.navigate("StudentList");
  };

  const viewAttendance = (subId) => {
    navigation.navigate("AttendanceList", { subId });
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Subject List" subtitle="Subjects" />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Card>
            <DataTable>
              <DataTable.Header style={styles.databeHeader}>
                <DataTable.Title>Subject</DataTable.Title>
                <DataTable.Title>Attendance</DataTable.Title>
              </DataTable.Header>
              {data.map((subject, i) => (
                <DataTable.Row style={styles.databeBox} key={i}>
                  <DataTable.Cell>{subject.subjectName}</DataTable.Cell>
                  <DataTable.Cell
                    onPress={() => viewAttendance(subject.subjectId)}
                  >
                    View Attendance
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card>
        </View>
      </ScrollView>
    </Provider>
  );
};
export default List;

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
