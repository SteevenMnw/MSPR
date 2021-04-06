//import liraries
import { relative } from "path";
import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Image, Button, SafeAreaView, ScrollView } from "react-native";

// create a component
const Profile = () => {
  const [userName, setUserName] = useState("Your Name");
  const [userSurname, setUserSurname] = useState("Your Surname");
  const [userMail, setUserMail] = useState("YouMail@gmail.com");
  const [userPassword, setUserPassword] = useState("**********");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Mon Compte</Text>
        <Image />

        <View style={styles.champ}>
          <Text style={styles.champName}>Nom </Text>
          <Text style={styles.champUser}>{userName}</Text>
          <Button title="Modifier" style={styles.modifButton} color="#000000" onPress={() => Alert.alert('Simple Button pressed')} />
        </View>

        <View style={styles.champ}>
          <Text style={styles.champName}>Prénom</Text>
          <Text style={styles.champUser}>{userSurname}</Text>
          <Button title="Modifier" style={styles.modifButton} color="#000000"  onPress={() => Alert.alert('Simple Button pressed')} />
        </View>

        <View style={styles.champ}>
          <Text style={styles.champName}>Email</Text>
          <Text style={styles.champUser}>{userMail}</Text>
          <Button title="Modifier" style={styles.modifButton} color="#000000" onPress={() => Alert.alert('Simple Button pressed')} />
        </View>

        <View style={styles.champ}>
          <Text style={styles.champName}>Mot de passe</Text>
          <Text style={styles.champUser}>{userPassword}</Text>
          <Button title="Modifier" style={styles.modifButton} color="#000000" onPress={() => Alert.alert('Simple Button pressed')} />
        </View>
      </ScrollView>
      

    </SafeAreaView>
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
    marginTop:20,
    fontWeight: "bold",
    color: "#000000",
  },
  champ:{
    backgroundColor:"#ffff",
    margin: 15,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F05454",
    padding: 15,
  },
  champName:{
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft:10,
  },
  champUser:{
    right: 17,
    margin: 0,
  },
  modifButton:{
  }
});

//make this component available to the app
export default Profile;
