//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountInfo = () => {
  //initialize variables
  const [user, setUser] = useState([]);
  const [userPassword, setUserPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [playOnce, setPlayOnce] = useState(false);
  const [pswd, setPswd] = useState("");

  useEffect(() => {
    if (!playOnce) {
      getUserSession();
    } else {
      asteriskPassword();
    }
  }, [playOnce]);

  //Get the User information from the Session
  getUserSession = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      setUser(JSON.parse(value));
      const valuePswd = await AsyncStorage.getItem("pswd");
      setPswd(JSON.parse(valuePswd));
      setPlayOnce(true);
    } catch (e) {
      console.log(e);
    }
  };

  //Hide the password with asterisk
  function asteriskPassword() {
    var asterisk = "";
    if (clicked == false) {
      for (var i = 0; i < pswd.length; i++) {
        asterisk = asterisk + "*";
      }
      setUserPassword(asterisk);
      setClicked(true);
    } else {
      setUserPassword(pswd);
      setClicked(false);
    }
  }

  return (
    <View>
      <View testID="test_champView1" style={styles.champ}>
        <Text style={styles.champName}>Nom</Text>
        <Text style={styles.champUser}>{user.surname}</Text>
      </View>

      <View testID="test_champView2" style={styles.champ}>
        <Text style={styles.champName}>Prenom</Text>
        <Text style={styles.champUser}>{user.name}</Text>
      </View>

      <View testID="test_champView3" style={styles.champ}>
        <Text style={styles.champName}>Email</Text>
        <Text style={styles.champUser}>{user.mail}</Text>
      </View>

      <View testID="test_champView4" style={styles.champ}>
        <Text style={styles.champName}>Mot de passe</Text>
        <Text>{userPassword}</Text>
        <Ionicons
          name="eye-outline"
          size={40}
          color="black"
          onPress={asteriskPassword}
        />
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
    marginHorizontal: 123,
  },
});
export default AccountInfo;
