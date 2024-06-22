/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from "@react-native-firebase/auth";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

const LoginScreen = ({navigation}) =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    const loginWithEmailAndPassword=()=>{
        if(email && password)
        auth().signInWithEmailAndPassword(email,password)
        .then((res)=>{
            console.log(res)
            Alert.alert("Login Succesful")
            navigation.navigate("HomeScreen")
        })
        .catch(err=>{
            console.log(err.message);
            Alert.alert(err.message)
        })
        else{
            Alert.alert("enter Email and Password")
        }
    }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login </Text>
      <TextInput
        value={email}
        style={styles.input}
        onChangeText={text=>setEmail(text)}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={text=>setPassword(text)} 
        style={styles.input}
        placeholder="Password(Au moins 6-ters)"
        secureTextEntry
      />
      <TouchableOpacity style={styles.signUpButton} onPress={loginWithEmailAndPassword}>
        <Text style={styles.signUpButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  signUpButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;