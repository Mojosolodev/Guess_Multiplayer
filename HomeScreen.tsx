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


function HomeScreen({ navigation }: { navigation: any }) {

  const goJoin=()=>{
    navigation.navigate("JoinRoom")
  }
  const goCreateRoom=()=>{
    navigation.navigate("CreateRoom")
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Guess The Number</Text>
    <TouchableOpacity style={styles.button} onPress={goCreateRoom}>
      <Text style={styles.buttonText}>Create Room</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={goJoin}>
      <Text style={styles.buttonText}>Join Room</Text>
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

export default HomeScreen;