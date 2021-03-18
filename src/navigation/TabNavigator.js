import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/Home";
import Scan from "../components/Scan";
import Offer from "../components/Offer";
import Profile from "../components/Profile";
import TabBar from "../components/TabBar";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ icon: "list-alt" }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        initialParams={{ icon: "qrcode" }}
      />
      <Tab.Screen
        name="Coupons"
        component={Offer}
        initialParams={{ icon: "percent" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ icon: "user" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
