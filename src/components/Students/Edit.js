import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Appbar } from "react-native-paper";

const Edit = ({ route, navigation }) => {
  const {
    pId,
    pRollNumber,
    pFName,
    pMName,
    pLName,
    pGender,
    pDob,
    pMobileNumber,
  } = route.params;
  const [id, setId] = useState(pId);
  const [rollNumber, setRollNumber] = useState(pRollNumber);
  const [firstName, setFirstName] = useState(pFName);
  const [middleName, setMiddleName] = useState(pMName);
  const [lastName, setLastName] = useState(pLName);
  const [gender, setGender] = useState(pGender);
  const [dob, setDob] = useState(pDob);
  const [mobileNumber, setMobileNumber] = useState(pMobileNumber);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    setId(pId);
    setRollNumber(pRollNumber);
    setFirstName(pFName);
    setMiddleName(pMName);
    setLastName(pLName);
    setGender(pGender);
    setDob(pDob);
    setMobileNumber(pMobileNumber);
  }, [pId, pFName]);

  const goBack = () => {
    navigation.navigate("StudentView");
  };

  const studentEdit = async () => {
    isLoading(true);
    await fetch(global.hostUrl + "/students", {
      method: "PUT",
      body: JSON.stringify({
        id,
        rollNumber,
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
        console.log("data updated successfully", data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        isLoading(false);
        navigation.navigate("StudentList");
      });
  };

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Student Edit" subtitle="Student" />
      </Appbar.Header>
      <TextInput
        editable={false}
        label="id"
        value={id?.toString()}
        onChangeText={(text) => setId(text)}
      />
      <TextInput
        label="Roll number"
        value={rollNumber}
        onChangeText={(text) => setRollNumber(text)}
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
        label="gender"
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
        onPress={studentEdit}
        style={{
          marginTop: 20,
        }}
        loading={loading}
      >
        <Text>Update</Text>
      </Button>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "600",
  },
});
