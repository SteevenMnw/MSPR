//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getCouponById, addCouponForUser } from "../API/API_Access";

/*
  Composant qui sert à afficher le modal afin de voir les informations du Coupon par rapport au résultat du Scanner
*/

const ModalCoupon = (props) => {
  // Initialisation des variables
  const { visible, idCoupon } = props; // Données qu'on a envoyer depuis le composant QRCode
  const [stateModal, setStateModal] = useState(true);
  const [coupon, setCoupon] = useState({});
  const [playOnce, setPlayOnce] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    // Si le résultat du scan est chiffre
    if (!isNaN(idCoupon)) {
      // Si on a pas encore lancer la page dans l'appli
      if (!playOnce) {
        getUserSession();
        setPlayOnce(true);
      }
      // Récupère le coupon grâce au résultat du scan
      getCouponById(idCoupon)
        // Si on récupère bien un coupon on le stock dans une variable
        .then((response) => {
          setCoupon(response);
          setPlayOnce(true);
        })
        // Si il y a une erreur on affiche un message d'erreur
        .catch(() => {
          noDisplayModal("Aucun coupon est associé à ce QR Code !");
        });
    }
    // Si le résultat du scan n'est pas chiffre
    else {
      noDisplayModal("Aucun coupon est associé à ce QR Code !");
    }
    // Si le coupon est plus disponible pour les utilisateurs
    if (coupon.info == 0) {
      noDisplayModal("Le coupon que vous avez scanné n'est plus disponible !");
    }
  }, [playOnce]);

  function noDisplayModal(textAlertError) {
    /*
      Fonction qui sert à afficher les erreurs du scan du QRCode
    */
    setStateModal(false);
    setCouponError(true);
    alert(textAlertError);
  }

  function getDifferenceInDays() {
    /*
      Fonction qui sert à afficher le nombre de jours jusqu'à expiration du coupon
    */
    const date1 = new Date();
    const date2 = new Date(coupon.date_end);
    const time_diff = date2.getTime() - date1.getTime();

    const days_diff = (time_diff / (1000 * 3600 * 24)).toFixed(0);

    return days_diff;
  }

  getUserSession = async () => {
    /*
      Fonction qui récupère en session l'utilisateur connecté
    */
    try {
      const value = await AsyncStorage.getItem("user");
      setUser(JSON.parse(value));
    } catch (e) {
      console.log(e);
    }
  };

  setUserSession = async () => {
    /*
      Fonction qui stock en session l'utilisateur avec sa nouvelle liste de coupons
    */
    try {
      AsyncStorage.clear();
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  function addCoupon() {
    /*
      Fonction qui ajoute le coupon dans la liste de l'utilisateur puis on restock la nouvelle liste en session
    */
    addCouponForUser(user.id_user, coupon.id_coupon)
      .then(() => {
        alert("Coupon ajouté à votre liste !");
        setUserSession();
        setStateModal(false);
      })
      .catch(() => alert("Coupon déjà enregistré à votre liste !"));
  }

  return (
    <Modal
      /* Option du modal */
      animationType="fade"
      transparent={true}
      visible={stateModal ? visible : stateModal}
      onRequestClose={() => {
        setStateModal(false);
      }}
    >
      {/* Si il n'y a pas d'erreur lors du chargement du coupon alors on affiche le contenu du modal */}
      {!couponError && (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.titleText}>Description du coupon : </Text>
              <Text style={styles.modalText}>{coupon.description}</Text>
              {/* Si le coupon a une date de fin alors on affiche le nombre de jours jusqu'à la date d'expiration */}
              {coupon.date_end && (
                <View>
                  <Text style={styles.titleText}>Date d'expiration : </Text>
                  <Text style={styles.modalText}>
                    Il reste {getDifferenceInDays()} jour(s) pour l'utiliser.
                  </Text>
                </View>
              )}
              {/* Si le coupon a un compteur alors on affiche */}
              {coupon.compteur && (
                <View>
                  <Text style={styles.titleText}>Utilisations : </Text>
                  <Text style={styles.modalText}>
                    Il reste {coupon.compteur} utilisations de ce coupon
                    disponible.
                  </Text>
                </View>
              )}
              <View style={styles.containerBottom}>
                <View style={styles.ViewButton}>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => addCoupon()}
                  >
                    <Text style={styles.textStyle}>Ajouter à votre liste</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setStateModal(false)}
                  >
                    <Text style={styles.textStyle}>Fermer</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: "absolute",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    /*width: 350,
    minHeight: 400,*/
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
  },

  /* Modal view's bottom */
  containerBottom: {
    marginTop: 20,
  },
  ViewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "#FF5D3B",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

//make this component available to the app
export default ModalCoupon;
