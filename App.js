import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/pages/SignUp";
import SignIn from "./src/pages/SignIn";
import Home from "./src/pages/Home";
import TabNavigator from "./src/navigation/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
