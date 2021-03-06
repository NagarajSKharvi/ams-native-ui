import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/Login";
import Home from "../components/Home";
import AdminHome from "../components/AdminHome";
import TeacherHome from "../components/TeacherHome";
import StudentHome from "../components/StudentHome";
import SList from "../components/Students/List";
import SSList from "../components/Students/SSList";
import SView from "../components/Students/Get";
import SEdit from "../components/Students/Edit";
import SSearch from "../components/Students/Search";
import SearchedGet from "../components/Students/SearchedGet";
import MyDetailsGet from "../components/Students/MyDetailsGet";
import SCreate from "../components/Students/Create";
import TList from "../components/Teacher/List";
import TView from "../components/Teacher/Get";
import TEdit from "../components/Teacher/Edit";
import TCreate from "../components/Teacher/Create";
import AttList from "../components/Attendance/List";
import MyAttList from "../components/MyAttendance/List";
import AttendancePercentage from "../components/MyAttendance/AttendancePercentage";
import AllAttendancePercentage from "../components/MyAttendance/AllAttendancePercentage";
import AttView from "../components/Attendance/Get";
import AttCreate from "../components/Attendance/Create";
import AttSearch from "../components/Attendance/SearchList";
import AASearch from "../components/Attendance/AASearch";
import TASearch from "../components/Attendance/TASearch";
import AAGet from "../components/Attendance/AAGet";
import CList from "../components/Class/List";
import SecList from "../components/Section/List";
import SubList from "../components/Subject/List";
import Signup from "../components/Signup";
import ResetPassword from "../components/ResetPassword";

const Stack = createNativeStackNavigator();
function Routes() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="StudentList"
            component={SList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SectionStudentList"
            component={SSList}
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
            name="StudentSearch"
            component={SSearch}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchedGet"
            component={SearchedGet}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MyDetailsGet"
            component={MyDetailsGet}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TeacherList"
            component={TList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TeacherView"
            component={TView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TeacherEdit"
            component={TEdit}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TeacherCreate"
            component={TCreate}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ClassList"
            component={CList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SectionList"
            component={SecList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SubjectList"
            component={SubList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MyAttendance"
            component={MyAttList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AttendancePercentage"
            component={AttendancePercentage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AllAttendancePercentage"
            component={AllAttendancePercentage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AttendanceList"
            component={AttList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AttendanceView"
            component={AttView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AttendanceCreate"
            component={AttCreate}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AttendanceSearch"
            component={AttSearch}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AASearch"
            component={AASearch}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TASearch"
            component={TASearch}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AAGet"
            component={AAGet}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TeacherHome"
            component={TeacherHome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AdminHome"
            component={AdminHome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StudentHome"
            component={StudentHome}
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
