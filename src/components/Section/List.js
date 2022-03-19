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
  const { cId } = route.params;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(global.hostUrl + `/ams/section/${cId}`)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  }, [cId]);

  const goBack = () => {
    navigation.navigate("ClassList");
  };

  const viewSubjects = (sId) => {
    navigation.navigate("SubjectList", { cId, sId });
  };

  const viewStudents = (sId) => {
    navigation.navigate("SectionStudentList", { cId, sId });
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Section List" subtitle="Sections" />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Card>
            <DataTable>
              <DataTable.Header style={styles.databeHeader}>
                <DataTable.Title>Section</DataTable.Title>
                <DataTable.Title>Students</DataTable.Title>
                <DataTable.Title>Subjects</DataTable.Title>
              </DataTable.Header>
              {data.map((section, i) => (
                <DataTable.Row style={styles.databeBox} key={i}>
                  <DataTable.Cell>{section.sectionName}</DataTable.Cell>
                  <DataTable.Cell
                    onPress={() => viewStudents(section.sectionId)}
                  >
                    View Students
                  </DataTable.Cell>
                  <DataTable.Cell
                    onPress={() => viewSubjects(section.sectionId)}
                  >
                    View Subjects
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
