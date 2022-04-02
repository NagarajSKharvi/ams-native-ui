import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  Provider,
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
} from "react-native-paper";
import { Circle } from "react-native-svg";

export default function AttendancePercentage({ route, navigation }) {
  const { userType, uId } = route.params;
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(global.hostUrl + `/attendance/student/pecentage/${uId}`)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false));
  }, []);

  const goBack = () => {
    if (userType === "student") {
      navigation.navigate("StudentHome");
    } else if (userType === "teacher") {
      navigation.navigate("TeacherHome");
    } else {
      navigation.navigate("AdminHome");
    }
  };

  return (
    <Provider>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content
            title="My Attendance Percentage"
            subtitle="Attendance"
          />
        </Appbar.Header>
        <View style={styles.mainbox}>
          <Text>{data}</Text>
        </View>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={90}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3d5875"
        >
          {(fill) => <Text>{90}</Text>}
        </AnimatedCircularProgress>
        <AnimatedCircularProgress
          size={150}
          width={20}
          fill={20}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >
          {(fill) => <Text>{10}</Text>}
        </AnimatedCircularProgress>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    fontSize: 15,
    fontSize: 35,
  },
  mainbox: {
    textAlign: "center",
    margin: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  databeBox: {
    margin: 2,
    textAlign: "left",
    height: 100,
  },
  databeHeader: {
    margin: 10,
    textAlign: "left",
  },
});
