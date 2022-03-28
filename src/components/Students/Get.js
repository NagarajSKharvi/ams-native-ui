import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Appbar } from "react-native-paper";
import StudentEdit from "./Edit";

const Get = ({ route, navigation }) => {
  const { source, cId, sId, pId } = route.params;
  const [userType, setUserType] = useState();
  const [id, setId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(pId);
    fetch(global.hostUrl + `/students/${pId}`)
      .then((response) => response.json()) // get response, convert to json
      .then((data) => {
        setId(data.id);
        setRollNumber(data.rollNumber);
        setFirstName(data.firstName);
        setMiddleName(data.middleName);
        setLastName(data.lastName);
        setGender(data.gender);
        setDob(data.dob);
        setMobileNumber(data.mobileNumber);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);

  useEffect(() => {
    readData();
  }, [userType]);

  const readData = async () => {
    try {
      const ut = await AsyncStorage.getItem("userType");
      setUserType(ut);
    } catch (e) {}
  };

  const goBack = () => {
    if (source === "SectionStudent") {
      navigation.navigate("SectionStudentList", { cId, sId });
    } else {
      navigation.navigate("StudentList", { userType });
    }
  };

  const studentDeleteAlert = () =>
    Alert.alert("Are you sure you want to delete this Student?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("Ok Pressed");
          studentDelete();
        },
      },
    ]);

  const studentDelete = async () => {
    setLoading(true);
    await fetch(global.hostUrl + `/students/${pId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        navigation.navigate("StudentList");
      });
  };

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Student View" subtitle="Student" />
      </Appbar.Header>
      <TextInput editable={edit} label="id" value={id?.toString()} />
      <TextInput editable={edit} label="Roll number" value={rollNumber} />
      <TextInput editable={edit} label="First name" value={firstName} />
      <TextInput editable={edit} label="Middle name" value={middleName} />
      <TextInput editable={edit} label="Last name" value={lastName} />
      <TextInput editable={edit} label="Gender" value={gender} />
      <TextInput editable={edit} label="DOB" value={dob} />
      <TextInput
        editable={edit}
        label="Mobile number"
        value={mobileNumber?.toString()}
      />

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("StudentEdit", {
            pId: id,
            pRollNumber: rollNumber,
            pFName: firstName,
            pMName: middleName,
            pLName: lastName,
            pGender: gender,
            pDob: dob,
            pMobileNumber: mobileNumber,
          })
        }
        style={{
          marginTop: 20,
        }}
      >
        <Text>Edit</Text>
      </Button>
      <Text></Text>
      <Button mode="contained" onPress={studentDeleteAlert}>
        <Text>Delete</Text>
      </Button>
    </View>
  );
};

export default Get;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "600",
  },
});
