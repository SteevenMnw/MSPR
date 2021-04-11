import React from 'react'
import {View, StyleSheet, Text} from "react-native";

import { Input, Button } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser, getUserByEmailAndPassword } from '../API/API_Access';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Crypto from "expo-crypto"

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dataSource: [], name:'', surname:'', email: '', passwd: '', checkPasswd:'', error: '' }
    }

    updateName = (name) => {
        this.setState({ name: name })
    };

    updateSurname = (surname) => {
        this.setState({ surname: surname })
    };

    updateEmail = (email) => {
        this.setState({ email: email })
    };

    updatePasswd = (passwd) => {
        this.setState({ passwd: passwd })
    };

    updatecheckPasswd = (checkPasswd) => {
        this.setState({ checkPasswd: checkPasswd })
    };

    updateError = (error) => {
        this.setState({ error: error })
    };

    setUserSession = async (email, newPasswd) => {
        try{
            getUserByEmailAndPassword(email, newPasswd)
                .then(data => { 
                    this.setState({ dataSource: data })
                    if(this.state.dataSource){
                        const jsonValue = JSON.stringify(this.state.dataSource)
                        AsyncStorage.setItem('user', jsonValue)
                    }
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    signUp = () => {
        try {
            name = this.state.name
            surname = this.state.surname
            email = this.state.email
            passwd = this.state.passwd
            checkPasswd = this.state.checkPasswd
            if(passwd == checkPasswd && passwd != "" && checkPasswd != "" && name && surname && email){
                if(email.includes("@") && email.includes(".com") || email.includes("@") && email.includes(".fr")){
                    const value = Crypto.digestStringAsync( Crypto.CryptoDigestAlgorithm.SHA256, passwd );
                    value.then((newPasswd) => {
                        this.setUserSession(email, newPasswd)
                        addUser(email, newPasswd, name, surname).then(() =>
                            this.updateError(""),
                            console.log("Inscrit")
                        )
                        // navigation.navigate("Home") a faire ----------------------------------
                    })
                    .catch(() => this.updateError("Une erreur est survenu, veuillez attendre quelque instant et recommencer"))
                }
                else{
                    this.updateError("Entrez un mail correcte")
                }
            }
            else if(passwd != checkPasswd && name && surname && email) {
                this.updateError("Les mots de passe ne sont pas identiques.")
            }
            else{
                this.updateError("Veuillez renseigner toutes les informations.")
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    render() {

        return (
            <View style={styles.main_container}>
                <View style={styles.Input}>
                    <Input
                        placeholder='Nom'
                        leftIcon={
                            <Ionicons
                                name='person-outline'
                                size={24}
                                color='black'
                            />
                        }
                        onChangeText={ this.updateName }
                        value={ this.state.name }
                    />
                    <Input
                        placeholder='Prenom'
                        leftIcon={
                            <Ionicons
                                name='people-outline'
                                size={24}
                                color='black'
                            />
                        }
                        onChangeText={ this.updateSurname }
                        value={ this.state.surname }
                    />
                    <Input
                        placeholder='Mail'
                        leftIcon={
                            <Ionicons
                                name='mail-outline'
                                size={24}
                                color='black'
                            />
                        }
                        onChangeText={ this.updateEmail }
                        value={ this.state.email }
                    />
                    <Input
                        secureTextEntry={true}
                        placeholder='Mot de passe'
                        leftIcon={
                            <Ionicons
                                name='lock-closed-outline'
                                size={24}
                                color='black'
                            />
                        }
                        onChangeText={ this.updatePasswd }
                        value={ this.state.passwd }
                    />
                    <Input
                        secureTextEntry={true}
                        placeholder='Confirmer Mot de passe'
                        leftIcon={
                            <Ionicons
                                name='lock-closed-outline'
                                size={24}
                                color='black'
                            />
                        }
                        onChangeText={ this.updatecheckPasswd }
                        value={ this.state.checkPasswd }
                    />
                </View>
                <View>
                    <Text style={styles.Error}>
                        { this.state.error }
                    </Text>
                    <Button
                        buttonStyle={{width: 150, alignSelf:"center"}}
                        title="S'inscrire"
                        onPress={ this.signUp }
                    />
                </View>
                <View style={{ bottom: -125, alignSelf:"center" }}>
                    <Text>
                        Vous avez déjà un compte ? 
                    </Text>
                    <TouchableOpacity style={{ alignSelf:"center" }} /*onPress={() => navigation.navigate("SignUp")} a faire ---------------------------------*/ >
                        <Text style={{ color: "#0099ff" }}>
                            Se connecter
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
    },
    Input: {
        paddingLeft: 70,
        paddingRight: 70
    },
    Error:{
        paddingBottom: 15,
        alignSelf: 'center',
        color: "red",
        fontSize: 17
    }
});

export default SignUp;
