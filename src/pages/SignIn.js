import React from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";

import { Input, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByEmailAndPassword } from "../API/API_Access";
import * as Crypto from "expo-crypto";

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

  setUserSession = async (value, pswd) => {
    try {
      AsyncStorage.clear();
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
      const jsonValuePswd = JSON.stringify(pswd);
      await AsyncStorage.setItem("pswd", jsonValuePswd);
    } catch (e) {
      console.log(e);
    }
  };

  getUser = () => {
    try{
      email = this.state.email;
      passwd = this.state.passwd;
      if (email && passwd) {
        const value = Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          passwd
        );
        value.then((newPasswd) => {
          getUserByEmailAndPassword(email, newPasswd)
            .then((data) => {
              this.setState({ dataSource: data });
              if (this.state.dataSource) {
                this.setUserSession(this.state.dataSource, this.state.passwd);
                this.props.navigation.navigate("Home");
              }
            })
            .catch(() =>
              this.updateError("Votre mail ou mot de passe est invalide")
            );
        });
      } else if (passwd == "" && email) {
        this.updateError("Veuillez insérer votre mot de passe.");
      } else if (email == "" && passwd) {
        this.updateError("Veuillez insérer votre mail.");
      } else {
        this.updateError("Veuillez renseigner toutes les informations.");
      }
    }
    catch(e){
      console.log(e);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        //behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main_container}>
            <View style={styles.Input}>
              <Input
                placeholder="Mail"
                leftIcon={
                  <Icon name="mail-outline" size={24} color="black" />
                }
                onChangeText={this.updateEmail}
                value={this.state.email}
              />
              <Input
                secureTextEntry={true}
                placeholder="Mot de passe"
                leftIcon={
                  <Icon
                    name="lock-closed-outline"
                    size={24}
                    color="black"
                  />
                }
                onChangeText={this.updatePasswd}
                value={this.state.passwd}
              />
            </View>
            <View>
              <Text testID="error" style={styles.Error}>{this.state.error}</Text>
              <Button
                buttonStyle={{
                  width: 150,
                  alignSelf: "center",
                  backgroundColor: "#ba473c",
                }}
                title="Se connecter"
                onPress={this.getUser}
              />
            </View>
            <View style={{ alignSelf: "center", paddingTop: 30 }}>
              <Text>Vous n'avez pas encore de compte ?</Text>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text style={{ color: "#ba473c" }}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
