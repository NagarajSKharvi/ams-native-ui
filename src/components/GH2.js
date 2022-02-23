import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";

// get data from this URL!
const studentsUrl = "http://192.168.1.103:9999/ams/students";
// const studentsUrl = "http://192.168.0.142:9999/ams/students";

const GH2 = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(studentsUrl)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
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
