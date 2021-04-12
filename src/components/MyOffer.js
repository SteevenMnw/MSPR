//import liraries
import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { deleteCouponForUser } from "../API/API_Access";

import Clipboard from "expo-clipboard";

import Toast from "react-native-tiny-toast";

// create a component
const MyOffer = (props) => {
  const { offer, user } = props;

  const copyToClipboard = () => {
    Clipboard.setString(offer.libelle.toString());
    const toast = Toast.show("Code copié");
    setTimeout(() => {
      Toast.hide(toast);
    }, 2000);
  };

  const deleteCoupon = (idCoupon) => {
    Alert.alert(
      null,
      "Voulez-vous vraiment supprimer le coupon de votre liste ?",
      [
        {
          text: "NON",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OUI",
          onPress: () => {
            deleteCouponForUser(user.id_user, idCoupon).then(() => {
              props.callBack(true);
            });
          },
        },
      ]
    );
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
          <Button color="#d43f53" title="Copié" onPress={() => copyToClipboard()} />
          <Text> </Text>
          <Button color="#000000" title="Supp" onPress={() => deleteCoupon(offer.id_coupon)} />
        </View>
      </View>
      <Text style={styles.date}>Valable jusqu'au {offer.date_end}</Text>
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
export default MyOffer;
