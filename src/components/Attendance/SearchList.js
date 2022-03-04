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

const SearchList = ({ navigation }) => {
  const [teachId, setTeachId] = useState(1);
  const [date, setDate] = useState();
  const [periodId, setPeriodId] = useState(1);
  const [sectionId, setSectionId] = useState(1);
  const [subjectId, setSubjectId] = useState(1);
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState([]);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(global.hostUrl + "/ams/period")
      .then((response) => response.json())
      .then((json) => {
        setPeriod(json);
      })
      .catch((error) => alert(error))
      .finally(() => {
        setDate(getCurrentDate());
      });

    fetch(global.hostUrl + `/ams/teacher-subject/${teachId}`)
      .then((response) => response.json())
      .then((json) => {
        setSubject(json);
      })
      .catch((error) => alert(error))
      .finally(() => {});
  }, []);

  const goBack = () => {
    navigation.navigate("Home");
  };

  const attendanceSearch = () => {
    fetch(global.hostUrl + "/attendance", {
      method: "POST",
      body: JSON.stringify({
        periodId,
        subjectId,
        teachId,
        date,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(json);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(true);
      });
  };

  const getCurrentDate = () => {
    var date = `${new Date().getDate()}`.padStart(2, "0");
    var month = `${new Date().getMonth() + 1}`.padStart(2, "0");
    var year = new Date().getFullYear();
    return [year, month, date].join("-");
  };

  return (
    <ScrollView>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Attendance Create" subtitle="Attendance" />
      </Appbar.Header>
      <View style={styles.mainbox}>
        <TextInput
          label="Attendance Date"
          value={date}
          onChangeText={(text) => setDate(text)}
        />
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
                onPress={() => {
                  setSubject(s.subject.subjectId);
                  setSectionId(s.subject.classSection.sectionId);
                }}
              />
            ))}
          </Picker>
        </Card>

        <Button
          mode="contained"
          onPress={() => {
            attendanceSearch();
          }}
          style={{
            marginTop: 20,
          }}
        >
          <Text>Search</Text>
        </Button>
        <Card>
          <DataTable>
            <DataTable.Header style={styles.databeHeader}>
              <DataTable.Title>Class</DataTable.Title>
              <DataTable.Title>Section</DataTable.Title>
              <DataTable.Title>Subject</DataTable.Title>

              <DataTable.Title>Date Taken</DataTable.Title>
            </DataTable.Header>
            {data.map((att, i) => (
              <DataTable.Row
                style={styles.databeBox}
                key={i}
                onPress={() => attendanceView(att.attendanceId)}
              >
                <DataTable.Cell>
                  {att.sectionSubject.classSection.studClass.className}
                </DataTable.Cell>
                <DataTable.Cell>
                  {att.sectionSubject.classSection.sectionName}
                </DataTable.Cell>
                <DataTable.Cell>
                  {att.sectionSubject.subjectName}
                </DataTable.Cell>
                <DataTable.Cell>{att.date}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card>
      </View>
    </ScrollView>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "600",
  },
});
