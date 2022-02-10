import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";

const GH2 = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const studData = [
    {
      id: 1,
      rollNumber: "13GAEC9041",
      firstName: "First Name 1",
      middleName: "Middle Name 1",
      lastName: "Last Name 1",
      dob: "2022-02-12",
      mobileNumber: 7204929841,
    },
    {
      id: 2,
      rollNumber: "13GAEC9042",
      firstName: "First Name 2",
      middleName: "Middle Name 2",
      lastName: "Last Name 2",
      dob: "2022-02-13",
      mobileNumber: 7204929842,
    },
    {
      id: 3,
      rollNumber: "13GAEC9043",
      firstName: "First Name 3",
      middleName: "Middle Name 3",
      lastName: "Last Name 3",
      dob: "2022-02-14",
      mobileNumber: 7204929843,
    },
    {
      id: 4,
      rollNumber: "13GAEC9044",
      firstName: "First Name 4",
      middleName: "Middle Name 4",
      lastName: "Last Name 4",
      dob: "2022-02-15",
      mobileNumber: 7204929844,
    },
  ];

  useEffect(() => {
    console.log(studData);
    setData(studData);
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.title}>Students</Text>
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.dataText}>
                  {item.id}. {item.rollNumber}, {item.firstName},
                  {item.middleName}, {item.lastName}, {item.dob},{" "}
                  {item.mobileNumber}
                </Text>
              </View>
            )}
          />
          <Text style={styles.description}>Whats this</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  dataText: {
    fontSize: 10,
    fontWeight: "200",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    color: "green",
  },
});

export default GH2;
