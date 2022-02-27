import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Provider, Appbar, Card, Avatar, DataTable } from "react-native-paper";

export default function List({ navigation }) {
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
    fetch(global.hostUrl + "/teachers")
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  };

  const goBack = () => {
    navigation.navigate("Home");
  };

  const handleSearch = () => console.log("Searching");

  const handleMore = () => {
    navigation.navigate("TeacherCreate");
  };

  const TeacherView = (pId) => {
    navigation.navigate("TeacherView", { pId });
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Teacher List" subtitle="Teachers" />
          <Appbar.Action icon="magnify" onPress={handleSearch} />
          <Appbar.Action icon="dots-vertical" onPress={handleMore} />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Card>
            <DataTable>
              <DataTable.Header style={styles.databeHeader}>
                <DataTable.Title>Photo</DataTable.Title>
                <DataTable.Title>Teach Number</DataTable.Title>
                <DataTable.Title>First Name</DataTable.Title>
                <DataTable.Title>Last Name</DataTable.Title>
              </DataTable.Header>
              {data.map((teach, i) => (
                <DataTable.Row
                  style={styles.databeBox}
                  key={i}
                  onPress={() => TeacherView(teach.id)}
                >
                  <DataTable.Cell>
                    <Avatar.Image source={{ uri: teach.avatar }} />
                  </DataTable.Cell>
                  <DataTable.Cell>{teach.teacherNumber}</DataTable.Cell>
                  <DataTable.Cell>{teach.firstName}</DataTable.Cell>
                  <DataTable.Cell>{teach.lastName}</DataTable.Cell>
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
