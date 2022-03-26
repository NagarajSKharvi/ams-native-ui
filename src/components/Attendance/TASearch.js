import { StyleSheet, ScrollView, Text, View, Picker } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Appbar,
  Chip,
  Card,
  DataTable,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const TASearch = ({ route, navigation }) => {
  const { teachId } = route.params;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState(null);
  const [periodId, setPeriodId] = useState(null);
  const [sectionId, setSectionId] = useState(1);
  const [subjectId, setSubjectId] = useState(null);
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(global.hostUrl + "/ams/period")
      .then((response) => response.json())
      .then((json) => {
        setPeriod([
          {
            periodId: null,
            fromTime: "Select",
            toTime: "",
          },
          ...json,
        ]);
      })
      .catch((error) => alert(error))
      .finally(() => {});

    fetch(global.hostUrl + "/teachers")
      .then((response) => response.json())
      .then((json) => {
        setTeacher([
          {
            id: null,
            teacherNumber: "Select",
          },
          ...json,
        ]);
      })
      .catch((error) => alert(error))
      .finally(() => {});

    fetch(global.hostUrl + `/ams/subject`)
      .then((response) => response.json())
      .then((json) => {
        setSubject([
          {
            subjectId: null,
            subjectName: "Select",
          },
          ...json,
        ]);
      })
      .catch((error) => alert(error))
      .finally(() => {});
  }, []);

  const attendanceSearch = () => {
    fetch(global.hostUrl + "/attendance/list", {
      method: "POST",
      body: JSON.stringify({
        periodId,
        subjectId,
        teachId,
        date: text,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(true);
      });
  };
  const goBack = () => {
    navigation.navigate("TeacherHome");
  };

  const attendanceView = (aId) => {
    console.log(aId);
    navigation.navigate("AAGet", { aId, teachId, source: "TASearch" });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(Platform.OS === "ios");
    var date1 = currentDate.getDate().toString().padStart(2, "0");
    var month1 = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    setText([currentDate.getFullYear(), month1, date1].join("-"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    console.log(show + " " + currentMode);
  };

  return (
    <ScrollView>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Attendance Search" subtitle="Attendance" />
      </Appbar.Header>
      <TextInput editable={false} label="Attendance Date" value={text} />
      <View>
        <Button
          mode="contained"
          title="Show date picker!"
          onPress={() => showMode("date")}
          style={{
            marginTop: 20,
          }}
        >
          <Text>Select Date</Text>
        </Button>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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
              label={p.periodId ? p.fromTime + " - " + p.toTime : p.fromTime}
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
          style={{ height: 50, width: 250 }}
          onValueChange={(itemValue, itemIndex) => setSubjectId(itemValue)}
        >
          {subject.map((s, i) => (
            <Picker.Item
              key={i}
              label={
                s.subjectId
                  ? s.classSection.studClass.className +
                    " " +
                    s.classSection.sectionName +
                    " " +
                    s.subjectName
                  : s.subjectName
              }
              value={s.subjectId}
              onPress={() => {
                setSubject(s.subjectId);
                setSectionId(s.classSection.sectionId);
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
          {data.length == 0 && (
            <Text style={styles.textdata}>No result to display</Text>
          )}
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
              <DataTable.Cell>{att.sectionSubject.subjectName}</DataTable.Cell>
              <DataTable.Cell>{att.date}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card>
    </ScrollView>
  );
};

export default TASearch;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "600",
  },
  textdata: {
    color: "black",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
});
