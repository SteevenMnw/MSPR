//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";



const AccountInfo = () => {
  const [user, setUser] = useState([]);
  const [playOnce, setPlayOnce] = useState(false);
  const [reload, setReload] = useState(false);
  const [userPassword, setUserPassword] = useState("**********");

  useEffect(() => {
    getUserSession();
  }, []);

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

  function doSomthing() {
    console.log("Greate everything work good");
    Alert.alert("Feature incoming 🚀");
  }

  return (
    <View>
      <View style={styles.champ}>
        <Text style={styles.champName}>Nom </Text>
        <Text style={styles.champUser}>{user.name}</Text>
        <Ionicons name="create-outline" size={40} color="black" onPress={doSomthing}/>
      </View>

      <View style={styles.champ}>
        <Text style={styles.champName}>Prénom</Text>
        <Text style={styles.champUser}>{user.surname}</Text>
        <Ionicons name="create-outline" size={40} color="black" onPress={doSomthing}/>
      </View>

      <View style={styles.champ}>
        <Text style={styles.champName}>Email</Text>
        <Text style={styles.champUser}>{user.mail}</Text>
        <Ionicons name="create-outline" size={40} color="black" onPress={doSomthing}/>
      </View>

      <View style={styles.champ}>
        <Text style={styles.champName}>Mot de passe</Text>
        <Text style={styles.champUser}>{userPassword}</Text>
        <Ionicons name="create-outline" size={40} color="black" onPress={doSomthing}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    padding: 25,
    marginTop: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  champ: {
    backgroundColor: "#ffff",
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F05454",
    padding: 15,
  },
  champName: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  champUser: {
    right: 17,
    margin: 0,
  },
  modifButton: {},
});
export default AccountInfo;
