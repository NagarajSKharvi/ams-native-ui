import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Appbar } from "react-native-paper";

const Create = ({ navigation }) => {
  const [teacherNumber, setTeacherNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, isLoading] = useState(false);

  useEffect(() => {}, []);

  const goBack = () => {
    navigation.navigate("TeacherList", { reload: true });
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

      <Button
        mode="contained"
        onPress={teacherCreate}
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
