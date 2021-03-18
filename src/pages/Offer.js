//import liraries
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
const Offer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Offer !</Text>
    </View>
  );
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
export default Offer;
