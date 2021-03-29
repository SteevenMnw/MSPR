import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Input, Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByEmailAndPassword } from "../API/API_Access";
import * as Crypto from "expo-crypto";
import { TouchableOpacity } from "react-native-gesture-handler";
import Home from "./Home";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [], email: "", passwd: "", error: "" };
  }

  updateEmail = (email) => {
    this.setState({ email: email });
  };

  updatePasswd = (passwd) => {
    this.setState({ passwd: passwd });
  };

  updateError = (error) => {
    this.setState({ error: error });
  };

  setUserSession = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  getUser = () => {
    email = this.state.email;
    passwd = this.state.passwd;
    if (email && passwd) {
      const value = Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        passwd
      );
      value.then((newPasswd) => {
        getUserByEmailAndPassword(email, newPasswd).then((data) => {
          this.setState({ dataSource: data });
          if (this.state.dataSource) {
            this.setUserSession(this.state.dataSource);
            //navigation.navigate(Home)
          }
        });
      });
    } else if (passwd == "" && email) {
      this.updateError("You forgot to enter your password.");
    } else if (email == "" && passwd) {
      this.updateError("You forgot to enter your email.");
    } else {
      this.updateError("You have not filled all the information.");
    }
  };

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.Input}>
          <Input
            placeholder="Email"
            leftIcon={<Ionicons name="mail-outline" size={24} color="black" />}
            onChangeText={this.updateEmail}
            value={this.state.email}
          />
          <Input
            secureTextEntry={true}
            placeholder="Password"
            leftIcon={
              <Ionicons name="lock-closed-outline" size={24} color="black" />
            }
            onChangeText={this.updatePasswd}
            value={this.state.passwd}
          />
        </View>
        <View>
          <Text style={styles.Error}>{this.state.error}</Text>
          <Button
            buttonStyle={{ width: 150, alignSelf: "center" }}
            title="Sign in"
            onPress={this.getUser}
          />
        </View>
        <View style={{ bottom: -225, alignSelf: "center" }}>
          <Text>You do not have an account ?</Text>
          <TouchableOpacity
            style={{
              alignSelf: "center",
            }} /*onPress={() => navigation.navigate("SignUp")} a faire ---------------------------------*/
          >
            <Text style={{ color: "#0099ff" }}>Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
  },
  Input: {
    paddingLeft: 70,
    paddingRight: 70,
  },
  Error: {
    paddingBottom: 25,
    alignSelf: "center",
    color: "red",
    fontSize: 17,
  },
});

export default SignIn;
