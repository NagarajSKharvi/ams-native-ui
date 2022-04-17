import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";

const SearchedGet = ({ route, navigation }) => {
  const { pId } = route.params;
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
    navigation.navigate("StudentSearch");
  };

  const viewAttReport = () => {
    navigation.navigate("AttendancePercentage", { userType, uId: pId });
  };

  const viewSubMonthAttReport = () => {
    navigation.navigate("AllAttendancePercentage", { userType, uId: pId });
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
        onPress={viewAttReport}
        style={{
          marginTop: 20,
        }}
      >
        <Text>Semester Wise Attendance Report</Text>
      </Button>
      <Button
        mode="contained"
        onPress={viewSubMonthAttReport}
        style={{
          marginTop: 20,
        }}
      >
        <Text>Subject & Month Wise Attendance Report</Text>
      </Button>
    </View>
  );
};

export default SearchedGet;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "600",
  },
});
