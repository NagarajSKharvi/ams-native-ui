import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/Login";
import Home from "../components/Home";
import SList from "../components/Students/List";
import SView from "../components/Students/Get";
import SEdit from "../components/Students/Edit";
import SCreate from "../components/Students/Create";
import Attendence from "../components/Attendence/List";

const Stack = createNativeStackNavigator();
function Routes() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="StudentList"
            component={SList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StudentView"
            component={SView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StudentEdit"
            component={SEdit}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StudentCreate"
            component={SCreate}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Attendence"
            component={Attendence}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Routes;
