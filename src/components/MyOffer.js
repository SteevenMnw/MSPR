//import liraries
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { deleteCouponForUser } from "../API/API_Access";
import Icon from "react-native-vector-icons/Ionicons";
import Clipboard from "expo-clipboard";

import Toast from "react-native-tiny-toast";

/* 
  Composant qui sert à afficher un coupon avec les différentes informations et deux bouttons pour supprimer ou copié
*/

// create a component
const MyOffer = (props) => {
  // Données qu'on a envoyer depuis le composant QRCode
  const { offer, user } = props;

  const copyToClipboard = () => {
    /*
      Fonction qui sert à copié le code du copons dans le pressPapier
    */
    Clipboard.setString(offer.libelle.toString());
    const toast = Toast.show("Code copié");
    setTimeout(() => {
      Toast.hide(toast);
    }, 2000);
  };

  const deleteCoupon = (idCoupon) => {
    /*
      Fonction qui demande si l'utilisateur veut bien supprimé le coupon
    */
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
            // Appel de la méthode API afin de supprimer dans la bdd le coupon que l'utilisateur a choisi
            deleteCouponForUser(user.id_user, idCoupon).then(() => {
              // Envoie de la données dans la page Offers pour lui informer un changement dans la liste
              props.callBack(true);
            });
          },
        },
      ]
    );
  };

  return (
    <View testID="test_view_container" style={styles.container}>
      <View testID="test_view_subContainer" style={{ flexDirection: "row", position: "relative" }}>
        <View testID="test_view_description" style={{ width: 230 }}>
          <Text style={styles.description}>{offer.description}</Text>
        </View>
        <View
          testID="test_view_icon"
          style={{
            position: "absolute",
            flexDirection: "row",
            right: 0,
            alignItems: "center",
          }}
        >
          <Icon
            name="copy-outline"
            size={40}
            color="black"
            onPress={() => copyToClipboard()}
          />

          <Text> </Text>

          <Icon
            name="trash-outline"
            size={40}
            color="#ba473c"
            onPress={() => deleteCoupon(offer.id_coupon)}
          />
        </View>
      </View>
      <Text testID="test_text_promo" style={{ fontWeight: "bold" }}>Code promo : {offer.libelle}</Text>
      {/* Si le coupon à une date d'expiration */}
      {offer.date_end && (
        <Text testID="test_text_timeLimit" style={styles.date}>Valable jusqu'au {offer.date_end}</Text>
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

export default MyOffer;
