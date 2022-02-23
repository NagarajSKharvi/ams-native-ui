import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

const StudentEdit = ({ data }) => {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, isLoading] = useState(false);

  const editItem = async () => {
    isLoading(true);
    await fetch("http://192.168.1.103:9999/ams/students", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
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
      .finally(() => isLoading(false));
  };
  return (
    <View>
      <Text style={styles.text}> {id}</Text>
      <Text style={styles.text}>{data?.firstName}</Text>
      <Text style={styles.text}>{data?.middleName}</Text>
      <Text style={styles.text}>{data?.lastName}</Text>
      <Text style={styles.text}>{data?.dob}</Text>
      <Text style={styles.text}>{data?.mobileNumber}</Text>

      <TextInput label="id" value={id} onChangeText={(text) => setId(id)} />
      <TextInput
        label="first name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        label="middle name"
        value={middleName}
        onChangeText={(text) => setMiddleName(text)}
      />
      <TextInput
        label="last name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        label="dob"
        value={dob}
        onChangeText={(text) => setDob(text)}
      />
      <TextInput
        label="mobile number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />

      <Button
        mode="contained"
        onPress={editItem}
        style={{
          marginTop: 20,
        }}
        loading={loading}
      >
        {" "}
        <Text>Edit</Text>
      </Button>
    </View>
  );
};

export default StudentEdit;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "600",
  },
});
