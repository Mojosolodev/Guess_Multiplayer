import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  Alert,
} from 'react-native';
import auth from "@react-native-firebase/auth"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore, { DocumentData } from '@react-native-firebase/firestore';

function CreateRoom({ navigation }: { navigation: any }) {
  const [partyName, setPartyName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [readyPlayers, setReadyPlayers] = useState(1);
  const [minInterval, setminInterval] = useState(1);
  const [maxInterval, setmaxInterval] = useState(100);

  const addPartie = () => {
    firestore().collection("partie").add({
      nom: partyName,
      nbMax_players: maxPlayers,
      readyPlayers:readyPlayers,
      minInterval:minInterval,
      maxInterval:maxInterval
    })
    Alert.alert("Party Created");
    setPartyName("")
    setMaxPlayers(1)
    setReadyPlayers(1)
    setminInterval(1)
    setmaxInterval(100)
    navigation.navigate("Lobby")
  }

  const handleMaxPlayersChange = (text: string) => {
    let value = parseInt(text);
    if (isNaN(value) || value < 1) {
      value = 1; // Set a minimum value of 1 if the input is not a valid number
    }
    setMaxPlayers(value);
  };
  const handleMin= (text: string) => {
    let value = parseInt(text);
    if (isNaN(value) || value < 1) {
      value = 1; // Set a minimum value of 1 if the input is not a valid number
    }
    setminInterval(value);
  };
  const handleMax = (text: string) => {
    let value = parseInt(text);
    if (isNaN(value) || value < 1) {
      value = 1; // Set a minimum value of 1 if the input is not a valid number
    }
    setmaxInterval(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create/Host A Party</Text>
      <TextInput
        style={styles.input}
        placeholder="Party Name"
        value={partyName}
        onChangeText={setPartyName}
      />
      <Text>Nombre Max de joueurs</Text>
      <NumericInput
        style={styles.input}
        placeholder="Max Players"
        value={maxPlayers}
        onChangeText={handleMaxPlayersChange}
        keyboardType="number-pad"
        minValue={1}
      />
      <Text>Interval Minimum</Text>
      <NumericInput
        style={styles.input}
        placeholder="Minimum Interval"
        value={minInterval}
        onChangeText={handleMin}
        keyboardType="number-pad"
        minValue={1}
      />
      <Text>Interval Maximum</Text>
      <NumericInput
        style={styles.input}
        placeholder="Maximum Interval"
        value={maxInterval}
        onChangeText={handleMax}
        keyboardType="number-pad"
        minValue={1}
      />
      <TouchableOpacity style={styles.button} onPress={addPartie}>
        <Text style={styles.buttonText}>Create party</Text>
      </TouchableOpacity>
    </View>
  );
}

const NumericInput = ({
  value,
  onChangeText,
  style,
  placeholder,
  keyboardType,
  minValue,
}: {
  value: number;
  onChangeText: (text: string) => void;
  style?: any;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  minValue?: number;
}) => {
  const handleChange = (text: string) => {
    let value = parseInt(text);
    if (isNaN(value) || value < (minValue || 1)) {
      value = minValue || 1;
    }
    onChangeText(value.toString());
  };

  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      value={value.toString()}
      onChangeText={handleChange}
      keyboardType={keyboardType || "number-pad"}
      maxLength={10}
      dataDetectorTypes="none"
      textContentType="none"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateRoom;