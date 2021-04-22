import React from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByEmailAndPassword } from "../API/API_Access";
import * as Crypto from "expo-crypto";

class SignIn extends React.Component {

  //initialize variables
  constructor(props) {
    super(props);
    this.state = { dataSource: [], email: "", passwd: "", error: "" };
  }

  //Update variables when changed
  updateEmail = (email) => {
    this.setState({ email: email });
  };

  updatePasswd = (passwd) => {
    this.setState({ passwd: passwd });
  };

  updateError = (error) => {
    this.setState({ error: error });
  };

  //Set the User data from API to Session to use it in another page
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

  //Function to connect the User
  getUser = () => {
    try {
      //Checking the accuracy of the information
      email = this.state.email;
      passwd = this.state.passwd;
      if (email && passwd) {
        //Crypt password
        const value = Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          passwd
        );
        value.then((newPasswd) => {
          //Call the API with parameters to check if the information are correct
          getUserByEmailAndPassword(email, newPasswd)
            .then((data) => {
              this.setState({ dataSource: data });
              if (this.state.dataSource) {
                //Call the UserSession function
                this.setUserSession(this.state.dataSource, this.state.passwd);
                //Go to the Home page
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
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      //Prevents the keyboard display from shifting everything up 
      <KeyboardAvoidingView
        testID="test_keyboardAvoidingView"
        style={styles.container}
      >
        {/* Allows you to exit keyboard mode by clicking elsewhere */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View testID="test_view_mainContainer" style={styles.main_container}>
            <View testID="test_view_input" style={styles.Input}>
              <Input
                testID="test_input_email"
                placeholder="Mail"
                leftIcon={<Icon name="mail-outline" size={24} color="black" />}
                onChangeText={this.updateEmail}
                value={this.state.email}
              />
              <Input
                testID="test_input_password"
                secureTextEntry={true}
                placeholder="Mot de passe"
                leftIcon={
                  <Icon name="lock-closed-outline" size={24} color="black" />
                }
                onChangeText={this.updatePasswd}
                value={this.state.passwd}
              />
            </View>
            <View testID="test_view_error-button">
              <Text testID="test_text_error" style={styles.Error}>
                {this.state.error}
              </Text>
              <Button
                testID="test_button_signIn"
                buttonStyle={{
                  width: 150,
                  alignSelf: "center",
                  backgroundColor: "#ba473c",
                }}
                title="Se connecter"
                onPress={this.getUser}
              />
            </View>
            <View
              testID="test_view_navigation"
              style={{ alignSelf: "center", paddingTop: 30 }}
            >
              <Text testID="test_text_beforeNavigation">
                Vous n'avez pas encore de compte ?
              </Text>
              <TouchableOpacity
                testID="test_touchableOpacity_navigation"
                style={{ alignSelf: "center" }}
                //Go to the SignUp page
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text
                  testID="test_text_navigation"
                  style={{ color: "#ba473c" }}
                >
                  S'inscrire
                </Text>
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
