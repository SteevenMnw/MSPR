import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAllCoupons } from "../API/API_Access";

import { getUserById } from "../API/API_Access";

import AsyncStorage from "@react-native-async-storage/async-storage";

// create a component
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accueil</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
export default Home;
