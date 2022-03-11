import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");

export default function Cards({ onPress, title, style }) {
  return (
    <Pressable
      style={{
        margin: 10,
      }}
      onPress={onPress}
      android_ripple={{
        color: "lightgrey",
      }}
    >
      <View
        style={[
          styles.container,
          {
            ...style,
          },
        ]}
      >
        <Text style={styles.font}>{title ?? "Card One"}</Text>
        <Text style={styles.description}>
          {/* this is a awesome card design with a elevation */}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.35,
    height: height * 0.2,
    backgroundColor: "white",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f7f7f7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    alignSelf: "stretch",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  font: {
    fontSize: 15,
    fontWeight: "bold",
  },
  description: {
    fontSize: 10,
    color: "grey",
    textAlign: "center",
  },
});
