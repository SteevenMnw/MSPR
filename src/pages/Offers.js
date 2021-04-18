//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { getUserById } from "../API/API_Access";

import AsyncStorage from "@react-native-async-storage/async-storage";

import MyOffer from "../components/MyOffer";

/*
  Page qui sert à afficher les offres enregistré de l'utilisateur connecté
*/

const Offers = () => {
  // Initialisation des variables
  const [user, setUser] = useState([]);
  const [playOnce, setPlayOnce] = useState(false);
  const [reload, setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Si on a pas encore lancer la page dans l'appli
    if (!playOnce) {
      getUserSession();
      setPlayOnce(true);
    } else {
      ReloadUser();
    }
  }, [reload]);

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

  ReloadUser = () => {
    /*
      Fonction qui récupère un utilisateur grâce à un id
    */
    getUserById(user.id_user).then((data) => {
      // Stock l'utilisateur trouvé dans une variable
      setUser(data);
      setRefreshing(false);
    });
  };

  handleRefresh = () => {
    /*
      Fonction qui actualise la liste des coupons de l'utilisateur
    */
    setRefreshing(true);
    ReloadUser();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes offres</Text>
      {/* Liste des coupons de l'utilisateur */}
      <FlatList
        data={user.coupons}
        keyExtractor={(item) => item.id_coupon.toString()}
        renderItem={({ item }) => (
          /* Appel du composant MyOffer pour chaque coupons */
          <MyOffer offer={item} user={user} callBack={setReload} />
        )}
        refreshing={refreshing}
        onRefresh={() => handleRefresh()}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
  title: {
    fontSize: 40,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: "bold",
    color: "#ba473c",
  },
});

//make this component available to the app
export default Offers;
