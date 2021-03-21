//import liraries
import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Tab from "./Tab";

const { width } = Dimensions.get("screen");

// create a component
const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState("Home");
  const { routes } = state;
  const renderColor = (currentTab) =>
    currentTab === selected ? "black" : "#909091";

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: width - 40,
    borderRadius: 100,
  },
});

//make this component available to the app
export default TabBar;
