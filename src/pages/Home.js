//import liraries
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAllCoupons } from "../API/API_Access";

// create a component
const Home = () => {
  useEffect(() => {
    getAllCoupons().then((res) => res);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Custom bottom tab nav !</Text>
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
export default Home;
