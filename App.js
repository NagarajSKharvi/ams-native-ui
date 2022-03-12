import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "./src/components/Login";
import Routes from "./src/routes/Routes";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

// import "./src/bootstrap/bootstrap.css";

export default function App() {
  return (
    <>
      <Routes />
    </>
  );
}

const styles = StyleSheet.create({});
