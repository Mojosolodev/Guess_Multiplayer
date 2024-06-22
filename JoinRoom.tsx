import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import auth from "@react-native-firebase/auth"
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore, { DocumentData } from '@react-native-firebase/firestore';

function JoinRoom({ navigation }: { navigation: any }) {

   

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
     const [parties, setParties] = useState([]); // Initial empty array of users

     const {params} =useRoute()
     console.log('--------------');
     console.log(parties.nom);
     console.log('--------------');

     const goLobby=()=>{
      navigation.navigate("Lobby",)
     }

    useEffect(() => {
        const subscriber = firestore()
          .collection('partie')
          .onSnapshot(querySnapshot => {
            const parties = [];
      
            querySnapshot.forEach(documentSnapshot => {
                parties.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setParties(parties);
            setLoading(false);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);
      

  const [partie, setPartie] = useState<DocumentData | undefined>(undefined);

  //recuperation de donnees du firestore
  const getData = async() => {
    const partiesCollection = await firestore().collection('partie').get();
    console.log(partiesCollection.docs[0].data());
    setPartie(partiesCollection.docs[0].data());
  }

  useEffect(() => {
    getData();
  }, []);


  console.log(parties)
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liste des Parties</Text>
      </View>

      <FlatList
      data={parties}
      renderItem={({ item }) => (
        <TouchableOpacity style={[styles.infoButton, styles.darkOrangeButton]} onPress={goLobby}>
          <View>
            <Text style={[styles.largeText, styles.darkOrangeText]}>Nom de la partie : <Text style={[styles.bold, styles.darkOrangeText]}>{item.nom}</Text></Text>
            <Text style={[styles.largeText, styles.darkOrangeText]}>Nombre maximum de joueurs : <Text style={[styles.bold, styles.darkOrangeText]}>{item.nbMax_players}</Text></Text>
            <Text style={[styles.largeText, styles.darkOrangeText]}>readyPlayers: <Text style={[styles.bold, styles.darkOrangeText]}>{item.readyPlayers}</Text></Text>
            <Text style={[styles.largeText, styles.darkOrangeText]}>min: <Text style={[styles.bold, styles.darkOrangeText]}>{item.minInterval}</Text>   -----------  <Text style={[styles.largeText, styles.darkOrangeText]}>max: <Text style={[styles.bold, styles.darkOrangeText]}>{item.maxInterval}</Text></Text></Text>
          </View>
        </TouchableOpacity>
      )}
    />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  largeText: {
    fontSize: 18,
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  darkOrangeText: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  infoButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 17,
    marginVertical: 7,
    alignItems: 'center',
  },
  darkOrangeButton: {
    backgroundColor: '#FF8C00',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JoinRoom;