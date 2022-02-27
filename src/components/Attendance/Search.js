// import { StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Button, TextInput, Appbar } from "react-native-paper";

// const Search = ({ navigation }) => {
//   const [subjectId, setFirstName] = useState("");
//   const [aDate, setDob] = useState("");
//   const [loading, isLoading] = useState(false);

//   useEffect(() => {}, []);

//   const goBack = () => {
//     navigation.navigate("StudentList", { reload: true });
//   };

//   const studentCreate = async () => {
//     isLoading(true);
//     await fetch(global.hostUrl + "/attendance/1", {
//       method: "GET",
//       body: JSON.stringify({
//         rollNumber,
//         firstName,
//         middleName,
//         lastName,
//         dob,
//         mobileNumber,
//       }),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("data added successfully", data);
//       })
//       .catch((err) => console.log(err))
//       .finally(() => {
//         isLoading(false);
//         navigation.navigate("StudentList");
//       });
//   };

//   return (
//     <View>
//       <Appbar.Header style={styles.header}>
//         <Appbar.BackAction onPress={goBack} />
//         <Appbar.Content title="Student Create" subtitle="Student" />
//       </Appbar.Header>

//       <TextInput
//         label="Attendance Date"
//         value={aDate}
//         onChangeText={(text) => setADate(text)}
//       />

//       <Button
//         mode="contained"
//         onPress={studentCreate}
//         style={{
//           marginTop: 20,
//         }}
//         loading={loading}
//       >
//         <Text>Create</Text>
//       </Button>
//     </View>
//   );
// };

// export default Search;

// const styles = StyleSheet.create({
//   text: {
//     color: "black",
//     fontWeight: "600",
//   },
// });
