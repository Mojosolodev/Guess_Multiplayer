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


function Lobby({ navigation }: { navigation: any }) {

  const goGame=()=>{
    navigation.navigate("Game")
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Waiting for Other Players</Text>
    <Text>Nb of ready Players : {1}</Text>
    <TouchableOpacity style={styles.button} onPress={goGame}>
      <Text style={styles.buttonText}>Start Game</Text>
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

export default Lobby;