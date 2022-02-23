import React, { useState, useEffect } from "react";

import { View, StyleSheet, ScrollView } from "react-native";
import { Row, Table } from "react-native-table-component";

function GH4() {
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

  const state = {
    tbHead: [
      "No",
      "Roll Number",
      "First Name",
      "Middle Name",
      "Last Name",
      "DOB",
      "Mob",
    ],
    widths: [100, 120, 130, 140, 150, 160, 170],
  };
  useEffect(() => {
    console.log(studData);
    setData(studData);
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table>
            <Row
              data={state.tbHead}
              widths={state.widths}
              style={styles.headerWrapper}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table>
              {data.map((data, index) => (
                <Row
                  key={index}
                  data={data}
                  textStyle={styles.text}
                  widthArr={state.widths}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: "#ffffff" },
                  ]}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 25,
  },
  headerWrapper: {
    height: 60,
    backgroundColor: "#BAEFBE",
  },
  text: {
    textAlign: "center",
  },
  row: {
    height: 60,
    backgroundColor: "#F6F7Fb",
  },
});

export default GH4;

// export default class GH4 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tbHead: [
//         "No",
//         "Roll Number",
//         "First Name",
//         "Middle Name",
//         "Last Name",
//         "DOB",
//         "Mob",
//       ],
//       widths: [100, 120, 130, 140, 150, 160, 170],
//     };
//   }

//   render() {
//     const state = this.state;
//     const data = [];
//     for (let i = 0; i < 50; i += 1) {
//       const totlatRows = [];
//       for (let j = 0; j < 9; j += 1) {
//         totlatRows.push(`${i}${j}`);
//       }
//       data.push(totlatRows);
//     }

//     return (
//       <View style={styles.container}>
//         <ScrollView horizontal={true}>
//           <View>
//             <Table>
//               <Row
//                 data={state.tbHead}
//                 widths={state.widths}
//                 style={styles.headerWrapper}
//                 textStyle={styles.text}
//               />
//             </Table>
//             <ScrollView style={styles.dataWrapper}>
//               <Table>
//                 {data.map((totlatRows, index) => (
//                   <Row
//                     key={index}
//                     data={totlatRows}
//                     textStyle={styles.text}
//                     widthArr={state.widths}
//                     style={[
//                       styles.row,
//                       index % 2 && { backgroundColor: "#ffffff" },
//                     ]}
//                   />
//                 ))}
//               </Table>
//             </ScrollView>
//           </View>
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 18,
//     paddingTop: 25,
//   },
//   headerWrapper: {
//     height: 60,
//     backgroundColor: "#BAEFBE",
//   },
//   text: {
//     textAlign: "center",
//   },
//   row: {
//     height: 60,
//     backgroundColor: "#F6F7Fb",
//   },
// });
