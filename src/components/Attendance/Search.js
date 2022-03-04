import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Appbar } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const Search = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

  const goBack = () => {
    navigation.navigate("Home");
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
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Attendance Search" subtitle="Attendance" />
      </Appbar.Header>
      <Text>{text}</Text>
      <View>
        <Button
          mode="contained"
          title="Show date picker!"
          onPress={() => showMode("date")}
          style={{
            marginTop: 20,
          }}
        >
          <Text>Date Picker</Text>
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
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "600",
  },
});
