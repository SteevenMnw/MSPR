//import liraries
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import QrCode from "../components/QrCode";

// create a component
const Scan = () => {
  return <QrCode />;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#76a6ef",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

//make this component available to the app
export default Scan;
