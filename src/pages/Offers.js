//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { getUserById } from "../API/API_Access";

import AsyncStorage from "@react-native-async-storage/async-storage";

import MyOffer from "../components/MyOffer";

// create a component
const Offers = () => {
  const [user, setUser] = useState([]);
  const [playOnce, setPlayOnce] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!playOnce) {
      getUserSession();
      setPlayOnce(true);
    } else {
      ReloadUser();
    }
  }, [reload]);

  getUserSession = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      setUser(JSON.parse(value));
    } catch (e) {
      console.log(e);
    }
  };

  ReloadUser = () => {
    getUserById(user.id_user).then((data) => {
      setUser(data);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes offres</Text>
      <FlatList
        data={user.coupons}
        keyExtractor={(item) => item.id_coupon.toString()}
        renderItem={({ item }) => (
          <MyOffer offer={item} user={user} callBack={setReload} />
        )}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#76a6ef",
  },
  title: {
    fontSize: 20,
    padding: 25,
    fontWeight: "bold",
    color: "#fff",
  },
});

//make this component available to the app
export default Offers;
