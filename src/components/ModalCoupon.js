//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";

import { getCouponById, addCouponForUser } from "../API/API_Access";

// create a component
const ModalCoupon = (props) => {
  const { visible, idCoupon } = props;
  const [stateModal, setStateModal] = useState(true);
  const [coupon, setCoupon] = useState({});
  const [playOnce, setPlayOnce] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (!isNaN(idCoupon)) {
      getCouponById(idCoupon)
        .then((response) => {
          setCoupon(response);
          setPlayOnce(true);
        })
        .catch(() => {
          noDisplayModal("Aucun coupon est associé à ce QR Code !");
        });
    } else {
      noDisplayModal("Aucun coupon est associé à ce QR Code !");
    }

    if (coupon.info == 0) {
      noDisplayModal("Le coupon que vous avez scanné n'est plus disponible !");
    }
  }, [playOnce]);

  function noDisplayModal(textAlertError) {
    setStateModal(false);
    setCouponError(true);
    alert(textAlertError);
  }

  function getDifferenceInDays() {
    const date1 = new Date();
    const date2 = new Date(coupon.date_end);
    const time_diff = date2.getTime() - date1.getTime();

    const days_diff = (time_diff / (1000 * 3600 * 24)).toFixed(0);

    return days_diff;
  }

  getUserSession = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      setUser(JSON.parse(value));
    } catch (e) {
      console.log(e);
    }
  };

  function addCoupon() {
    addCouponForUser(user.id_user, coupon.id_coupon)
      .then(() => {
        alert("Coupon ajouté à votre liste !");
        setStateModal(false);
      })
      .catch(() => alert("Coupon déjà enregistré à votre liste !"));
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={stateModal ? visible : stateModal}
      onRequestClose={() => {
        setStateModal(false);
      }}
    >
      {!couponError && (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.titleText}>Description du coupon : </Text>
              <Text style={styles.modalText}>{coupon.description}</Text>
              {coupon.date_end && (
                <View>
                  <Text style={styles.titleText}>Date d'expiration : </Text>
                  <Text style={styles.modalText}>
                    Il reste {getDifferenceInDays()} jour(s) pour l'utiliser.
                  </Text>
                </View>
              )}
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
