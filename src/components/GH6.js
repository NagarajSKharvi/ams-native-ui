import React, { Component, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Provider,
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
} from "react-native-paper";
import StudentsService from "../service/StudentsService";
import StudentEdit from "./Students/Edit";

const studentsUrl = "http://192.168.1.103:9999/ams/students";

export default function GH6({ navigation, route }) {
  const itemsPerPage = 2;
  // const id = route.params; //take object
  const { id } = route.params; //take only required param
  const [page, setPage] = React.useState(0);

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const goBack = () => {
    console.log("Went back");
    navigation.navigate("DataPage");
  };

  useEffect(() => {
    fetch(`${studentsUrl}${id}`)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state

    console.log(id, "id=====>");
  }, []);

  return (
    <Provider>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Students" subtitle="Subtitle" />
      </Appbar.Header>
      <View style={{ ...styles.mainbox }}>
        <DataTable.Cell>
          <Avatar.Image size={45} source={{ uri: data.avatar }} />
        </DataTable.Cell>
        {/* <DataTable.Cell style={styles.text}>{data.id}</DataTable.Cell>
        <DataTable.Cell style={styles.text}>{data.rollNumber}</DataTable.Cell>
        <DataTable.Cell style={styles.text}>{data.firstName}</DataTable.Cell>
        <DataTable.Cell style={styles.text}>{data.middleName}</DataTable.Cell>
        <DataTable.Cell style={styles.text}>{data.lastName}</DataTable.Cell>
        <DataTable.Cell style={styles.text}>{data.dob}</DataTable.Cell>
        <DataTable.Cell style={styles.text}>{data.mobileNumber}</DataTable.Cell> */}
        {/* pass few values */}
        <StudentEdit
          pId={data.id}
          pRollNumber={data.rollNumber}
          pFName={data?.firstName}
          pMName={data?.middleName}
          pLName={data?.lastName}
          pDob={data?.dob}
          pMobileNumber={data?.mobileNumber}
        />
        {/* <StudentEdit data={data[0]} /> */}
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
  text: {
    color: "black",
  },
});
