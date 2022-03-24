import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  Provider,
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
} from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

const List = ({ navigation }) => {
  const [userType, setUserType] = useState();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(global.hostUrl + "/ams/class")
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    readData();
  }, [userType]);

  const readData = async () => {
    try {
      const ut = await AsyncStorage.getItem("userType");
      setUserType(ut);
    } catch (e) {}
  };

  const goBack = () => {
    if (userType === "student") {
      navigation.navigate("StudentHome");
    } else if (userType === "teacher") {
      navigation.navigate("TeacherHome");
    } else {
      navigation.navigate("AdminHome");
    }
  };

  const sectionView = (cId) => {
    navigation.navigate("SectionList", { cId });
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Class List" subtitle="Classes" />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Card>
            <DataTable>
              <DataTable.Header style={styles.databeHeader}>
                <DataTable.Title>Class</DataTable.Title>
                <DataTable.Title>Sections</DataTable.Title>
              </DataTable.Header>
              {data.map((classes, i) => (
                <DataTable.Row
                  style={styles.databeBox}
                  key={i}
                  onPress={() => sectionView(classes.classId)}
                >
                  <DataTable.Cell>{classes.className}</DataTable.Cell>
                  <DataTable.Cell>View Sections</DataTable.Cell>
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
