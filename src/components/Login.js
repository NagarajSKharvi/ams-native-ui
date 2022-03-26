import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({ response: "Login Failed" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loading, setLoading] = useState();
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [disable, setDisable] = useState(true);

  React.useEffect(() => {
    checkAllValues();
  }, [username, password]);

  const checkAllValues = () => {
    if (username !== "" && password !== "") {
      return setDisable(false);
    }
    return setDisable(true);
  };

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
          AsyncStorage.setItem("userId", json.id.toString());
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
      <TextInput
        style={styles.textInput}
        textContentType="password"
        placeholder="Password"
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
      <Button
        title="Login"
        style={styles.button}
        width={width * 0.9}
        disabled={disable}
        onPress={() => {
          onClickButton();
        }}
      />
      <View
        style={{
          flex: 1 / 4,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 10,
          }}
        >
          Don't have an account ?
          <Button
            title="Sign Up"
            style={styles.button}
            width={width * 0.9}
            height={1}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          />
        </Text>
      </View>
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
