import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/Login";
import Home from "../components/Home";
import GH from "../components/GH3";

const Stack = createNativeStackNavigator();
function Routes() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GH" component={GH} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Routes;
