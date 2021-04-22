//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { addCouponForUser } from "../API/API_Access";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-tiny-toast";

// Create a component
const HomeCard = (props) => {
  // Initialization of variables
  const { offer } = props;
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserSession();
  }, []);

  // Put user infos in session
  getUserSession = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      setUser(JSON.parse(value));
    } catch (e) {
      console.log(e);
    }
  };

  // Add coupons to the list
  addCoupons = (idCoupon) => {
    // Call api method with the user id and the coupon id in parameters, for add coupons in DB.
    addCouponForUser(user.id_user, idCoupon)
      // If ok = show a validation message
      .then(() => {
        const toast = Toast.show("Coupon ajouté à votre liste");
        setTimeout(() => {
          Toast.hide(toast);
        }, 3500);
      })
      // If not = the coupons already use, so show an error message.
      .catch(() => {
        const toast = Toast.show("Coupon déjà ajouté");
        setTimeout(() => {
          Toast.hide(toast);
        }, 3500);
      });
  };

  return (
    // Data that we put in the flatlist on Home.js, description about the coupon
    <View style={styles.container}>
      <View style={{ flexDirection: "row", position: "relative" }}>
        <View style={{ width: 230 }}>
          <Text style={styles.description}>{offer.description}</Text>
        </View>
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            right: 0,
            alignItems: "center",
          }}
        >
          {/* Button to call the method which add the coupon */}
          <Text
            style={{ marginRight: 15 }}
            onPress={() => addCoupons(offer.id_coupon)}
          >
            <Icon name="add-circle-outline" size={40} color="black" />
          </Text>
        </View>
      </View>
      {/* If coupons have an end date then we display the date */}
      {offer.date_end && (
        <Text style={styles.date}>Valable jusqu'au {offer.date_end}</Text>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  button: {
    color: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    padding: 15,
  },
  description: {
    fontSize: 16,
  },
  date: {
    fontSize: 9,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "#FF5D3B",
  },
});

//make this component available to the app
export default HomeCard;
