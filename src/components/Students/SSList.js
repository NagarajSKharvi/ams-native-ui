import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Provider, Appbar, Card, Avatar, DataTable } from "react-native-paper";

export default function SSList({ route, navigation }) {
  const { cId, sId } = route.params;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const reloadOnFocus = navigation.addListener("focus", () => {
      getList();
    });
    getList();
    return reloadOnFocus;
  }, []);

  const getList = () => {
    fetch(global.hostUrl + `/ams/student/${sId}`)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  };

  const goBack = () => {
    navigation.navigate("SectionList", { cId });
  };

  const handleSearch = () => console.log("Searching");

  const handleMore = () => {
    navigation.navigate("StudentCreate");
  };

  const studentView = (pId) => {
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
                  onPress={() => studentView(stud.id)}
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
