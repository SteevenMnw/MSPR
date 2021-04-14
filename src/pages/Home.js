import React from "react";
import { View, Text, StyleSheet } from "react-native";


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
    paddingLeft: 15,
    paddingTop:5,
    fontWeight: "bold",
    color: "#ba473c",
  },
});

//make this component available to the app
export default Home;
