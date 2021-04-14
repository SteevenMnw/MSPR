import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getAvailableCoupons } from "../API/API_Access";
import HomeCard from "../components/HomeCard";

// create a component
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch(getAvailableCoupons())
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      });
  }

  _renderItem = ({ item }) => (<HomeCard offer={item} />);

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Accueil</Text>
          <FlatList
            data={this.state.dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id_coupon.toString()}
          />
        </View>
      );
    }
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
  text: {
    fontSize: 40,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom:5,
    fontWeight: "bold",
    color: "#ba473c",
  },
});

//make this component available to the app
export default Home;
