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
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import auth from "@react-native-firebase/auth";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

function SignUpScreenTest({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Add your sign-up logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  const signUpTestFn = () => {
    auth().createUserWithEmailAndPassword(email, password).then(() => {
      Alert.alert("User Created,You can now Login");
      navigation.navigate("Login");
    })
    .catch((err) => {
      console.log(err.message);
      Alert.alert(err.message);
    })
  }

  const handleImagePress = () => {
    Alert.alert('Google Sign-In ');
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text=>setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password(Au moins 6-ters)"
        value={password}
        onChangeText={text=>setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signUpButton} onPress={signUpTestFn}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
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

const Stack = createNativeStackNavigator();

function SignUpScreen(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignUpScreen" component={SignUpScreenTest} />
    </Stack.Navigator>
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

export default SignUpScreen;