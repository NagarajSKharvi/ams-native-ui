import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Card, DataTable, Button } from "react-native-paper";
import { CheckBox } from "react-native-elements";

const Create = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(global.hostUrl + "/attendance/get")
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json.studentAttendanceResponses);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const goBack = () => {
    navigation.navigate("Home");
  };

  const pickDate = () => {
    try {
      const { action, year, month, day } = DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        // date: new Date(2020, 4, 25),
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const attendanceCreate = async (subId, aDate) => {
    setLoading(true);
    await fetch(global.hostUrl + "/attendance/create", {
      method: "POST",
      body: JSON.stringify({
        subjectId: subId,
        date: aDate,
        studentAttendanceRequests: data,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("attendence added successfully", data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Attendance Create" subtitle="Attendance" />
      </Appbar.Header>
      <View style={styles.mainbox}>
        <Card>
          <DataTable>
            <DataTable.Header style={styles.databeHeader}>
              <DataTable.Title>Roll Number</DataTable.Title>
              <DataTable.Title>Present</DataTable.Title>
            </DataTable.Header>
            {data.map((att, i) => (
              <DataTable.Row style={styles.databeBox} key={i}>
                <DataTable.Cell>{att.rollNumber}</DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox
                    checked={data[i].present}
                    onPress={() => {
                      att.present = !att.present;
                      setData([...data]);
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card>
        <Button
          mode="contained"
          onPress={() => {
            attendanceCreate(1, new Date());
            navigation.navigate("Home");
          }}
          style={{
            marginTop: 20,
          }}
        >
          <Text>Add Attendance</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "600",
  },
});
