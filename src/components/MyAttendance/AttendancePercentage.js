import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Appbar, Provider } from "react-native-paper";

export default function AttendancePercentage({ route, navigation }) {
  const { userType, uId } = route.params;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(global.hostUrl + `/attendance/student/pecentage/all/${uId}`)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json["percentages"]);
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

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {item.type}
        </Text>

        <AnimatedCircularProgress
          size={100}
          width={20}
          fill={item.percentage}
          tintColor="#00e0ff"
          backgroundColor={item.percentage > 75 ? "#3d5875" : "red"}
        >
          {(fill) => <Text>{item.percentage}</Text>}
        </AnimatedCircularProgress>
      </View>
    );
  };

  return (
    <Provider>
      <Appbar.Header style={{}}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Attendance Status" subtitle="Attendance" />
      </Appbar.Header>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 20,
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "red",
              marginRight: 20,
            }}
          ></View>
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Less then 75% attendance
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 20,
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "green",
              marginRight: 20,
            }}
          ></View>
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            More then 75% attendance
          </Text>
        </View>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 16,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Semester Wise Report
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
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
