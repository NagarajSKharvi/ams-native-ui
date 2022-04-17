import { StyleSheet, Text, View, Picker } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Appbar, Card, Chip } from "react-native-paper";

const Create = ({ navigation }) => {
  const [userType, setUserType] = useState("admin");
  const [teacherNumber, setTeacherNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [subjectId, setSubjectId] = useState(1);
  const [subject, setSubject] = useState([]);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    fetch(global.hostUrl + `/ams/subject`)
      .then((response) => response.json())
      .then((json) => {
        setSubject(json);
      })
      .catch((error) => alert(error))
      .finally(() => {});
  }, []);

  const goBack = () => {
    navigation.navigate("TeacherList", { reload: true });
  };

  const createNavigate = () => {
    teacherCreate();
    navigation.navigate("TeacherList", { userType });
  };

  const teacherCreate = async () => {
    isLoading(true);
    await fetch(global.hostUrl + "/teachers", {
      method: "POST",
      body: JSON.stringify({
        teacherNumber,
        firstName,
        middleName,
        lastName,
        gender,
        dob,
        mobileNumber,
        subjectId,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data added successfully", data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        isLoading(false);
        navigation.navigate("TeacherList");
      });
  };

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Teacher Create" subtitle="Teacher" />
      </Appbar.Header>
      <TextInput
        label="Teach number"
        value={teacherNumber}
        onChangeText={(text) => setTeacherNumber(text)}
      />
      <TextInput
        label="First name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        label="Middle name"
        value={middleName}
        onChangeText={(text) => setMiddleName(text)}
      />
      <TextInput
        label="Last name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        label="Gender"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <TextInput
        label="DOB"
        value={dob}
        onChangeText={(text) => setDob(text)}
      />
      <TextInput
        label="Mobile number"
        value={mobileNumber?.toString()}
        onChangeText={(text) => setMobileNumber(text)}
      />
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
                setSubjectId(s.subjectId);
              }}
            />
          ))}
        </Picker>
      </Card>
      <Button
        mode="contained"
        onPress={createNavigate}
        style={{
          marginTop: 20,
        }}
        loading={loading}
      >
        <Text>Create</Text>
      </Button>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "600",
  },
});
