import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const { width, height } = Dimensions.get("window");
export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({ response: "Login Failed" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState();
  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  React.useEffect(() => {}, []);

  const onClickButton = async () => {
    await fetch(global.hostUrl + "/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setResponse(json);
        if (json.response === "Success") {
          const userType = json.userType;
          AsyncStorage.setItem("userType", userType);
          AsyncStorage.setItem("userId", json.id);
          if (userType === "admin") {
            navigation.navigate("AdminHome");
          } else if (userType === "teacher") {
            navigation.navigate("TeacherHome");
          } else if (userType === "student") {
            navigation.navigate("StudentHome");
          }
        } else {
          setHasLoginFailed(true);
          alert(json.response);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
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
          AMS
        </Text>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Username"
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
        placeholder="Password"
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />
      <Button
        title="Login"
        style={styles.button}
        width={width * 0.9}
        onPress={() => {
          onClickButton();
        }}
      />
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
