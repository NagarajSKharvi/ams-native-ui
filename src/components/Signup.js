import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  Picker,
  Switch,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useValidation } from "react-native-form-validator";

const { width, height } = Dimensions.get("window");
export default function Signup({ navigation }) {
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [student, setStudent] = useState(false);
  const toggleSwitch = () => setStudent((previousState) => !previousState);
  const [disable, setDisable] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  React.useEffect(() => {
    checkAllValues();
  }, [number, username, password, confirmPassword]);

  const checkAllValues = () => {
    if (
      number !== "" &&
      username !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      return setDisable(false);
    }
    return setDisable(true);
  };

  const onClickButton = async () => {
    await fetch(global.hostUrl + "/create", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        student,
        number,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        if (json.status === 500) {
          alert(json.message);
        } else {
          alert("Your account has been created");
          navigation.navigate("Login");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="orange" />
      <View
        style={{
          flex: 1 / 4,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Register to AMS
        </Text>
      </View>

      <View
        style={[
          styles.textInput,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View>
          <Text
            style={{
              color: "black",
            }}
          >
            Account Type
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "700",
            }}
          >
            {student ? "Student" : "Teacher"}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={student ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={student}
          />
        </View>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your Number"
        onChangeText={(text) => {
          setNumber(text);
        }}
        value={number}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Enter your EmailId"
        onChangeText={(text) => {
          setUsername(text);
        }}
        value={username}
      />
      {/* {username.length < 5 && (
        <Text style={{ color: "red" }}>{"Please Enter atleast 5 chars"}</Text>
      )} */}
      <TextInput
        style={styles.textInput}
        textContentType="password"
        placeholder="Enter your Password"
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        secureTextEntry={passwordVisible}
        right={
          <TextInput.Icon
            name={passwordVisible ? "eye" : "eye-off"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />
      <TextInput
        style={styles.textInput}
        textContentType="password"
        placeholder="Re-enter your Password"
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        value={confirmPassword}
        secureTextEntry={confirmPasswordVisible}
        right={
          <TextInput.Icon
            name={confirmPasswordVisible ? "eye" : "eye-off"}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          />
        }
      />

      <Pressable
        style={{
          width: width * 0.85,
          backgroundColor: "dodgerblue",
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 7,
          marginBottom: 20,
        }}
        android_ripple={{
          color: "lightgrey",
        }}
        onPress={() => {
          onClickButton();
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Register
        </Text>
      </Pressable>

      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 7,
        }}
        android_ripple={{
          color: "lightgrey",
        }}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text
          style={{
            color: "dodgerblue",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Back to Login
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  textInput: {
    width: width * 0.85,
    height: 40,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    width: width,
  },
});
