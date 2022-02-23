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

const studentsUrl = "http://192.168.1.102:9999/ams/students";

export default function List({ navigation }) {
  const [page, setPage] = React.useState(0);

  // const [pageReload, setPageReload] = React.useState(reload);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getAllList = () => {
    console.log("calleddd ===>");
    fetch(studentsUrl)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        console.log(json);
        setData(json);
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

  const handleSearch = () => console.log("Searching");

  const handleMore = () => {
    navigation.navigate("StudentCreate");
  };

  const viewStud = (pId) => {
    console.log("Success");
    console.log(pId);
    navigation.navigate("StudentView", { pId });
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Student List" subtitle="Students" />
          <Appbar.Action icon="magnify" onPress={handleSearch} />
          <Appbar.Action icon="dots-vertical" onPress={handleMore} />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Card>
            <DataTable>
              <DataTable.Header style={styles.databeHeader}>
                <DataTable.Title>Photo</DataTable.Title>
                <DataTable.Title>Roll Number</DataTable.Title>
                <DataTable.Title>First Name</DataTable.Title>
                <DataTable.Title>Last Name</DataTable.Title>
              </DataTable.Header>
              {data.map((stud, i) => (
                <DataTable.Row
                  style={styles.databeBox}
                  key={i}
                  onPress={() => viewStud(stud.id)}
                >
                  <DataTable.Cell>
                    <Avatar.Image source={{ uri: stud.avatar }} />
                  </DataTable.Cell>
                  <DataTable.Cell>{stud.rollNumber}</DataTable.Cell>
                  <DataTable.Cell>{stud.firstName}</DataTable.Cell>
                  <DataTable.Cell>{stud.lastName}</DataTable.Cell>
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
