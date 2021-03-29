import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/pages/SignUp";
import SignIn from "./src/pages/SignIn";
//import TabNavigator from "./src/navigation/TabNavigator";

import QrCode from "./src/components/QrCode";

export default function App() {
  return (
    <NavigationContainer>
      <SignIn />
    </NavigationContainer>
  );
}
