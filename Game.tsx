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

function Game({ navigation }: { navigation: any }) {
  const [position, setPosition] = useState(1);
  const [guess, setGuess] = useState(1);
  const [isPositionDisabled, setIsPositionDisabled] = useState(false);
  const [isOkButtonDisabled, setIsOkButtonDisabled] = useState(false);

  const handlePosition = (text: string) => {
    let value = parseInt(text);
    if (isNaN(value) || value < 1) {
      value = 1; // Set a minimum value of 1 if the input is not a valid number
    }
    setPosition(value);
  };

  const handleGuess = (text: string) => {
    let value = parseInt(text);
    if (isNaN(value) || value < 1) {
      value = 1; // Set a minimum value of 1 if the input is not a valid number
    }
    setGuess(value);
  };

  const handleOkPress = async () => {
    try {
      await firestore()
        .collection('players')
        .doc('BqaK70Ka0PRS04JbqKgM')
        .update({ position: position });
      setIsPositionDisabled(true);
      setIsOkButtonDisabled(true);
    } catch (error) {
      console.error('Error updating position:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Number</Text>
      <NumericInput
        style={styles.input}
        placeholder="Choose Your Number"
        value={position}
        onChangeText={handlePosition}
        keyboardType="number-pad"
        minValue={1}
        editable={!isPositionDisabled}
      />
      <TouchableOpacity
        style={[styles.button, isOkButtonDisabled && styles.disabledButton]}
        onPress={handleOkPress}
        disabled={isOkButtonDisabled}
      >
        <Text style={[styles.buttonText, isOkButtonDisabled && styles.disabledButtonText]}>Ok</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Try A number</Text>
      <NumericInput
        style={styles.input}
        placeholder="Try number"
        value={guess}
        onChangeText={handleGuess}
        keyboardType="number-pad"
        minValue={1}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>guess</Text>
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
  editable = true,
}: {
  value: number;
  onChangeText: (text: string) => void;
  style?: any;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  minValue?: number;
  editable?: boolean;
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
      editable={editable}
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
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#666',
  },
});

export default Game;