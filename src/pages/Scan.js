//import liraries
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import QrCode from "../components/QrCode";

// create a component
const Scan = () => {
  return (
   
  <View style={styles.container}>
      <Text style={styles.text}>QR Code</Text>
      <QrCode />
  </View> 
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#E8E8E8",
  },
  text: {
    fontSize: 40,
    padding: 25,
    marginTop: 20,
    fontWeight: "bold",
    color: "#000000",
  },
});

//make this component available to the app
export default Scan;
