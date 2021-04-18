import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";
import { Dimensions } from "react-native";

import ModalCoupon from "./ModalCoupon";

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;

/*
  Composant qui est le scanner de QRCode
*/

export default function QrCode() {
  // Initialisation des variables
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      // Demande la permission d'accéder à la caméra de l'utilisateur
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    if (result != "") {
      // Si le résultat du Scan n'est pas vide on change la variable ShowModal à true
      setShowModal(true);
    }
  }, [result, showModal]);

  const handleBarCodeScanned = ({ data }) => {
    // Dès qu'on scan on initialise le scanned à true pour dire qu'on a scanner et on stock le résultat dans une variable
    setScanned(true);
    setResult(data);
  };

  // Retourne un message par rapport à la permission de la caméra
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <Text style={styles.description}>Scanner votre QR Code</Text>
        <Image style={styles.qr} source={require("../../assets/img/Qr.png")} />
        {scanned && (
          // Apparition du boutton dès qu'on scan pour rescan un qrCode avec la réinitialisation des variables
          <Button
            title={"Tap to Scan Again"}
            onPress={() => {
              setScanned(false);
              setResult("");
              setShowModal(false);
            }}
          />
        )}
      </BarCodeScanner>
      {/* Dès qu'il y a un résultat par rapport au scan du QRCode on appel le composant ModalCoupon */}
      {showModal && <ModalCoupon visible={showModal} idCoupon={result} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  qr: {
    marginTop: "20%",
    marginBottom: "20%",
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.09,
    marginTop: "10%",
    textAlign: "center",
    width: "70%",
    color: "white",
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "70%",
    color: "white",
  },
});
