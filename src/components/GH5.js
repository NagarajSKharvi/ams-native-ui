import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Provider,
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
} from "react-native-paper";

export default function GH5({ navigation }) {
  const itemsPerPage = 2;

  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const studData = [
    {
      id: 1,
      rollNumber: "9041",
      firstName: "First Name 1",
      middleName: "Middle Name 1",
      lastName: "Last Name 1",
      dob: "2022-02-12",
      mobileNumber: 7204929841,
    },
    {
      id: 2,
      rollNumber: "9042",
      firstName: "First Name 2",
      middleName: "Middle Name 2",
      lastName: "Last Name 2",
      dob: "2022-02-13",
      mobileNumber: 7204929842,
    },
    {
      id: 3,
      rollNumber: "9043",
      firstName: "First Name 3",
      middleName: "Middle Name 3",
      lastName: "Last Name 3",
      dob: "2022-02-14",
      mobileNumber: 7204929843,
    },
    {
      id: 4,
      rollNumber: "9044",
      firstName: "First Name 4",
      middleName: "Middle Name 4",
      lastName: "Last Name 4",
      dob: "2022-02-15",
      mobileNumber: 7204929844,
    },
  ];

  React.useEffect(() => {
    setData(studData);
    setLoading(false);
  }, []);

  const goBack = () => {
    console.log("Went back");
    navigation.navigate("Home");
  };

  const handleSearch = () => console.log("Searching");

  const handleMore = () => console.log("Shown more");

  const viewStud = (id) => {
    console.log("Success");
    navigation.navigate("Student", { id });
  };

  return (
    <Provider>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Students" subtitle="Subtitle" />
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
                  <Avatar.Image size={45} source={{ uri: stud.avatar }} />
                </DataTable.Cell>
                <DataTable.Cell>{stud.rollNumber}</DataTable.Cell>
                <DataTable.Cell>{stud.firstName}</DataTable.Cell>
                <DataTable.Cell>{stud.lastName}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card>
      </View>
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
    margin: 10,
    textAlign: "center",
  },
  databeHeader: {
    margin: 10,
    textAlign: "left",
  },
});
