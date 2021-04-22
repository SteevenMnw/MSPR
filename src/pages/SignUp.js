import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addUser, getUserByEmailAndPassword } from "../API/API_Access";
import * as Crypto from "expo-crypto";

class SignUp extends React.Component {
  //initialize variables
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      name: "",
      surname: "",
      email: "",
      passwd: "",
      checkPasswd: "",
      error: "",
    };
  }

  //Update variables when changed
  updateName = (name) => {
    this.setState({ name: name });
  };

  updateSurname = (surname) => {
    this.setState({ surname: surname });
  };

  updateEmail = (email) => {
    this.setState({ email: email });
  };

  updatePasswd = (passwd) => {
    this.setState({ passwd: passwd });
  };

  updatecheckPasswd = (checkPasswd) => {
    this.setState({ checkPasswd: checkPasswd });
  };

  updateError = (error) => {
    this.setState({ error: error });
  };

  //Set the User data from API to Session to use it in another page
  setUserSession = async (email, newPasswd, pswd) => {
    try {
      AsyncStorage.clear();
      getUserByEmailAndPassword(email, newPasswd).then((data) => {
        this.setState({ dataSource: data });
        if (this.state.dataSource) {
          const jsonValue = JSON.stringify(this.state.dataSource);
          AsyncStorage.setItem("user", jsonValue);
          const jsonValuePswd = JSON.stringify(passwd);
          AsyncStorage.setItem("pswd", jsonValuePswd);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Function to register the User
  signUp = () => {
    try {
      //Checking the accuracy of the information
      name = this.state.name;
      surname = this.state.surname;
      email = this.state.email;
      passwd = this.state.passwd;
      checkPasswd = this.state.checkPasswd;
      if (
        passwd == checkPasswd &&
        passwd != "" &&
        checkPasswd != "" &&
        name &&
        surname &&
        email
      ) {
        if (
          (email.includes("@") && email.includes(".com")) ||
          (email.includes("@") && email.includes(".fr"))
        ) {
          //Crypt password
          const value = Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            passwd
          );
          value.then((newPasswd) => {
            //Call the API with parameters to add a new user
            addUser(email, newPasswd, surname, name)
              .then(
                () => this.updateError(""),
                //Call the UserSession function
                this.setUserSession(email, newPasswd, passwd),
                //Go to the Home page
                this.props.navigation.navigate("Home")
              )
              .catch(() =>
                this.updateError(
                  "Une erreur est survenu, veuillez attendre quelque instant et recommencer"
                )
              );
          });
        } else {
          this.updateError("Entrez un mail correcte");
        }
      } else if (passwd != checkPasswd && name && surname && email) {
        this.updateError("Les mots de passe ne sont pas identiques.");
      } else {
        this.updateError("Veuillez renseigner toutes les informations.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View testID="test_view_mainContainer" style={styles.main_container}>
        <ScrollView testID="test_scrollView" style={{ paddingVertical: 80 }}>
          <View testID="test_view_input" style={styles.Input}>
            <Input
              testID="test_input_name"
              placeholder="Nom"
              leftIcon={<Icon name="person-outline" size={24} color="black" />}
              onChangeText={this.updateName}
              value={this.state.name}
            />
            <Input
              testID="test_input_surname"
              placeholder="Prenom"
              leftIcon={<Icon name="people-outline" size={24} color="black" />}
              onChangeText={this.updateSurname}
              value={this.state.surname}
            />
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
            <Input
              testID="test_input_checkPassword"
              secureTextEntry={true}
              placeholder="Confirmer mot de passe"
              leftIcon={
                <Icon name="lock-closed-outline" size={24} color="black" />
              }
              onChangeText={this.updatecheckPasswd}
              value={this.state.checkPasswd}
            />
          </View>
          <View testID="test_view_error-button">
            <Text testID="test_text_error" style={styles.Error}>
              {this.state.error}
            </Text>
            <Button
              testID="test_button_signUp"
              buttonStyle={{
                width: 150,
                alignSelf: "center",
                backgroundColor: "#ba473c",
              }}
              title="S'inscrire"
              onPress={this.signUp}
            />
          </View>
          <View
            testID="test_view_navigation"
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text testID="test_text_beforeNavigation">
              Vous avez déjà un compte ?
            </Text>
            <TouchableOpacity
              testID="test_touchableOpacity_navigation"
              style={{ alignSelf: "center" }}
              //Go to the SignUp page
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              <Text testID="test_text_navigation" style={{ color: "#ba473c" }}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    paddingBottom: 15,
    alignSelf: "center",
    color: "red",
    fontSize: 17,
  },
});

export default SignUp;
