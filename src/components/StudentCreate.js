import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

const StudentEdit = ({ pId, pFName }) => {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, isLoading] = useState(false);

  const editItem = async () => {
    isLoading(true);
    await fetch("http://192.168.1.103:9999/ams/students", {
      method: "POST",
      body: JSON.stringify({
        id,
        firstName,
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
      <Text style={styles.text}> {pId}</Text>
      <Text style={styles.text}>{pFName}</Text>

      <TextInput
        label="first  name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
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
        <Text>Submit</Text>
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
