import { ScrollView, StyleSheet, Text, View, Picker } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Appbar,
  Card,
  DataTable,
  Button,
  Chip,
  TextInput,
} from "react-native-paper";
import { CheckBox } from "react-native-elements";

const Create = ({ navigation }) => {
  const [teachId, setTeachId] = useState(1);
  const [date, setDate] = useState();
  const [periodId, setPeriodId] = useState(1);
  const [subjectId, setSubjectId] = useState(1);
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState([]);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(global.hostUrl + "/attendance/get")
      .then((response) => response.json())
      .then((json) => {
        setData(json.studentAttendanceResponses);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));

    fetch(global.hostUrl + "/ams/period")
      .then((response) => response.json())
      .then((json) => {
        setPeriod(json);
      })
      .catch((error) => alert(error))
      .finally(() => {
        setLoading(false);
        setDate(getCurrentDate());
      });

    fetch(global.hostUrl + `/ams/teacher-subject/${teachId}`)
      .then((response) => response.json())
      .then((json) => {
        setSubject(json);
      })
      .catch((error) => alert(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const goBack = () => {
    navigation.navigate("Home");
  };

  const getCurrentDate = () => {
    var date = `${new Date().getDate()}`.padStart(2, "0");
    var month = `${new Date().getMonth() + 1}`.padStart(2, "0");
    var year = new Date().getFullYear();
    return [year, month, date].join("-");
  };

  const attendanceCreate = async () => {
    setLoading(true);
    await fetch(global.hostUrl + "/attendance/create", {
      method: "POST",
      body: JSON.stringify({
        subjectId,
        date,
        periodId,
        teachId,
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
        <TextInput label="Attendance Date" value={date} />
        <Card>
          <Chip>Select Period</Chip>
          <Picker
            periodId={periodId}
            style={{ height: 50, width: 185 }}
            onValueChange={(itemValue, itemIndex) => setPeriodId(itemValue)}
          >
            {period.map((p, i) => (
              <Picker.Item
                key={i}
                label={p.fromTime + " - " + p.toTime}
                value={p.periodId}
                onPress={() => setPeriodId(p.periodId)}
              />
            ))}
          </Picker>
        </Card>
        <Card>
          <Chip>Select Subject</Chip>
          <Picker
            subjectId={subjectId}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) => setSubjectId(itemValue)}
          >
            {subject.map((s, i) => (
              <Picker.Item
                key={i}
                label={
                  s.subject.classSection.studClass.className +
                  " " +
                  s.subject.classSection.sectionName +
                  " " +
                  s.subject.subjectName
                }
                value={s.subject.subjectId}
                onPress={() => setSubject(s.subject.subjectId)}
              />
            ))}
          </Picker>
        </Card>
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
            attendanceCreate();
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
