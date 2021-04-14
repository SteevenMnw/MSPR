//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { addCouponForUser } from "../API/API_Access";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import Toast from "react-native-tiny-toast";

// create a component
const HomeCard = (props) => {
  const { offer } = props;

  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserSession();
  }, []);

  getUserSession = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      setUser(JSON.parse(value));
    } catch (e) {
      console.log(e);
    }
  };

  addCoupons = (idCoupon) => {
    addCouponForUser(user.id_user, idCoupon)
      .then(() => {
        const toast = Toast.show("Coupon ajouté à votre liste");
        setTimeout(() => {
          Toast.hide(toast);
        }, 3500);
      })
      .catch(() => {
        const toast = Toast.show("Coupon déjà ajouté");
        setTimeout(() => {
          Toast.hide(toast);
        }, 3500);
      });
  };

  return (
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
          <Text
            style={{ marginRight: 15 }}
            onPress={() => addCoupons(offer.id_coupon)}
          >
            <Ionicons name="add-circle-outline" size={40} color="black" />
          </Text>
        </View>
      </View>
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
