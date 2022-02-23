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

const { width, height } = Dimensions.get("window");
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  const onClickButton = (values) => {
    if (email === "" && password === "") {
      console.log("Success");
      navigation.navigate("Home");
    } else {
      console.log("Failed");
      setHasLoginFailed(true);
      simpleAlertHandler();
    }
  };
  const simpleAlertHandler = () => {
    alert("Invalid Credentials");
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
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <TextInput
        style={styles.textInput}
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
        onPress={onClickButton}
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
