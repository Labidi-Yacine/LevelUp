// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';


// const Parametre = () => {


//     return (
//         <View style={styles.container}>
//         <Text style={styles.title}>Reglages</Text>
        
//         </View>
//     );
//     };

//     const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: "#173c63"

//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     description: {
//         fontSize: 18,
//         textAlign: 'center',
//     },
//     });

// export default Parametre;

import React, { useState } from 'react';
import { View, Text, Button, Switch, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Parametre = () => {
  // État pour gérer la sélection des données à supprimer
  const [selectedData, setSelectedData] = useState({
    level: false,
    characteristics: false,
    // completedQuestIds: false,
    quests: false,
    experiencePoints: false,
    profileImage: false,
    username: false,
  });

  // Fonction pour basculer la sélection d'une donnée
  const toggleSelection = (key) => {
    setSelectedData(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  // Fonction pour supprimer les données sélectionnées
  const deleteSelectedData = async () => {
    try {
      if (selectedData.level) {
        await AsyncStorage.removeItem('level');
      }
      if (selectedData.characteristics) {
        await AsyncStorage.removeItem('characteristics');
      }
      // if (selectedData.completedQuestIds) {
      //   await AsyncStorage.removeItem('completedQuestIds');
      // }
      if (selectedData.quests) {
        await AsyncStorage.removeItem('quests');
      }
      if (selectedData.experiencePoints) {
        await AsyncStorage.removeItem('experiencePoints');
      }
      if (selectedData.profileImage) {
        await AsyncStorage.removeItem('profileImage');
      }
      if (selectedData.username) {
        await AsyncStorage.removeItem('username');
      }
      // Message de confirmation
      Alert.alert("Données supprimées", "Les données sélectionnées ont été supprimées.");
      // Réinitialiser l'état après suppression
      setSelectedData({
        level: false,
        characteristics: false,
        // completedQuestIds: false,
        quests: false,
        experiencePoints: false,
        profileImage: false,
        username: false,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression des données:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la suppression des données.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      
      <Text style={styles.subtitle}>Gestion des données</Text>
      <View >
        {Object.keys(selectedData).map((key) => (
          <View key={key} style={styles.item}>
            <Text style={styles.element}>{key}</Text>
            <Switch
              value={selectedData[key]}
              onValueChange={() => toggleSelection(key)}
            />
          </View>
        ))}
      </View>
      
      <Button style={styles.button} title="SUPPRIMER LES DONNEES SELECTIONNEES" onPress={deleteSelectedData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#173c63"

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',

  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',

  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    
  },
  element: {
    color: 'white',
  },
  button: {
    color: 'white',
  }
});

export default Parametre;
