import React from "react";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { Text, Alert, BackHandler } from "react-native";
import SignIn from "./src/pages/SignIn";
import TabNavigator from "./src/navigation/TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./src/pages/SignUp";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const navigationRef = React.createRef();
export function navigate(name) {
  navigationRef.current?.dispatch(CommonActions.navigate(name));
}

const createTwoButtonAlert = () => {
  Alert.alert(
    "Leave",
    "Voulez-vous vraiment quitter GoStyle ?",
    [
      {
        text: "Non",
        style: "cancel",
      },
      {
        text: "Oui",
        onPress: () => {
          AsyncStorage.clear();
          BackHandler.exitApp();
        },
      },
    ],
    { cancelable: false }
  );
};

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: null,
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: "Connexion",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#ba473c",
          },
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Inscription",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#ba473c",
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          title: "Go Style",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#ba473c",
          },
          headerRight: () => (
            <Text style={{ marginRight: 15 }} onPress={createTwoButtonAlert}>
              <Icon name="logout" size={25} color="white" />
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
