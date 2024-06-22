import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from "@react-native-firebase/auth"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';


function JoinRoom() {

  //recuperation de donnees du firestore
  const getData = async() =>{
    const partiesCollection = await firestore().collection('partie').get();
    console.log(partiesCollection)
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Liste des Parties</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Retour</Text>
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JoinRoom;