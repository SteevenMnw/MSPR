import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from "./src/pages/SignIn";
import TabNavigator from "./src/navigation/TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./src/pages/SignUp";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={TabNavigator} />
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
