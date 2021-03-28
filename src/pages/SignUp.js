import React from 'react'
import {View, StyleSheet, Text} from "react-native";

import { Input, Button } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser } from '../API/API_Access';
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

    setUserSession = async (email, passwd, name, surname) => {
        try{
            const value = {
                "email": email,
                "password": passwd,
                "name": name,
                "surname": surname
            }
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('user', jsonValue)
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
                        console.log(newPasswd)
                        this.setUserSession(email, newPasswd, name, surname)
                        addUser(email, newPasswd, name, surname)
                        // navigation.navigate("Home") a faire ----------------------------------
                    })
                }
                else{
                    this.updateError("Please enter a correct email")
                }
            }
            else if(passwd != checkPasswd && name && surname && email) {
                this.updateError("Passwords do not match.")
            }
            else{
                this.updateError("You have not filled all the information.")
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
                        placeholder='Name'
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
                        placeholder='Surname'
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
                        placeholder='Email'
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
                        placeholder='Password'
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
                        placeholder='Confirm Password'
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
                        title="Sign up"
                        onPress={ this.signUp }
                    />
                </View>
                <View style={{ bottom: -125, alignSelf:"center" }}>
                    <Text>
                        Already have an account ? 
                    </Text>
                    <TouchableOpacity style={{ alignSelf:"center" }} /*onPress={() => navigation.navigate("SignUp")} a faire ---------------------------------*/ >
                        <Text style={{ color: "#0099ff" }}>
                            Sign In.
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