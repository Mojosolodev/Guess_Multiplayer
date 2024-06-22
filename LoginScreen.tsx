/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import auth from "@react-native-firebase/auth";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


function LoginScreen({ navigation }: { navigation: any }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '',
          });          
    },[])

    const loginWithEmailAndPassword=()=>{
        if(email && password)
        auth().signInWithEmailAndPassword(email,password)
        .then((res)=>{
            console.log(res)
            Alert.alert("Login Successful")
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

    const handleImagePress = () => {
        Alert.alert('Google Sign-In ');
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
      <TouchableWithoutFeedback onPress={handleImagePress}>
        <Image
          source={require('./google.png')}
          style={styles.image}
        />
      </TouchableWithoutFeedback>
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
  image: {
    width: 100,
    height: 100,
    marginTop: 24,
  },
});

export default LoginScreen;