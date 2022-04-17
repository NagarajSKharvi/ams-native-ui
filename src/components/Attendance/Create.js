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
import DateTimePicker from "@react-native-community/datetimepicker";

const Create = ({ route, navigation }) => {
  const { userType, uId } = route.params;
  const [date, setDate] = useState(new Date());
  const [periodId, setPeriodId] = useState(1);
  const [sectionId, setSectionId] = useState(1);
  const [subjectId, setSubjectId] = useState(1);
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState([]);
  const [subject, setSubject] = useState([]);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(global.hostUrl + `/attendance/add/${sectionId}`)
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
        setText(getCurrentDate());
      });

    fetch(global.hostUrl + `/ams/teacher-subject/${uId}`)
      .then((response) => response.json())
      .then((json) => {
        setSubjectId(json[0].subject.subjectId);
        setSectionId(json[0].subject.classSection.sectionId);
        setSubject(json);
      })
      .catch((error) => alert(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    {
      fetch(global.hostUrl + `/attendance/add/${subjectId}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json.studentAttendanceResponses);
        })
        .catch((error) => alert(error))
        .finally(() => setLoading(false));
    }
  }, [subjectId]);

  const goBack = () => {
    if (userType === "student") {
      navigation.navigate("StudentHome");
    } else if (userType === "teacher") {
      navigation.navigate("TeacherHome");
    } else {
      navigation.navigate("AdminHome");
    }
  };

  const getCurrentDate = () => {
    var date = `${new Date().getDate()}`.padStart(2, "0");
    var month = `${new Date().getMonth() + 1}`.padStart(2, "0");
    var year = new Date().getFullYear();
    return [year, month, date].join("-");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(Platform.OS === "ios");
    var date1 = currentDate.getDate().toString().padStart(2, "0");
    var month1 = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    setText([currentDate.getFullYear(), month1, date1].join("-"));
  };

  const attendanceCreate = async () => {
    setLoading(true);
    await fetch(global.hostUrl + "/attendance", {
      method: "POST",
      body: JSON.stringify({
        subjectId,
        date,
        periodId,
        teachId: uId,
        studentAttendanceRequests: data,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 500) {
          alert(data.message);
        } else {
          navigation.navigate("TeacherHome");
        }
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
            onValueChange={(itemValue, itemIndex) => {
              setSubjectId(itemValue);
            }}
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
                  setSubjectId(s.subject.subjectId);
                  setSectionId(s.subject.classSection.sectionId);
                }}
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
