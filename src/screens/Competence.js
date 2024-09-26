// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import BouncyCheckbox from "react-native-bouncy-checkbox";
// import AsyncStorage from '@react-native-async-storage/async-storage';



// const Competence = ({ route }) => {
//     const navigation = useNavigation();
//     const [quests, setQuests] = useState([]);
//     const [experiencePoints, setExperiencePoints] = useState();



//     const navigateToParam = () => {
//         navigation.navigate('Parametre');
//     };

//     const navigateToProfil = () => {
//         const totalQuests = quests.length;
//         const completedQuests = quests.filter(quest => quest.completed).length;
//         navigation.navigate('Profil', { totalQuests, completedQuests, experiencePoints, quests, });
//     };

//     const navigateToLogin = () => {
//         navigation.navigate('Login');
//     };



//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Competences</Text>
            
            
//             <TouchableOpacity style={styles.paramButton} onPress={navigateToParam}>
//                 <Text style={styles.paramText}>Réglages</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.profilButton} onPress={navigateToProfil}>
//                 <Text style={styles.profilText}>Statut</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
//                 <Text style={styles.loginText}>Connexion</Text>
//             </TouchableOpacity>
            
        
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 60,
//         padding: 20,
//         backgroundColor: "#173c63"
//     },
//     title: {
//         color: "white",
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         alignSelf: 'center',
//     },
//     questItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     questTitle: {
//         color: 'white',
//         fontSize: 19,
//         fontWeight: 'bold',
//         marginBottom: 5,
//         marginTop: 15,
//     },
//     completed: {
//         textDecorationLine: 'line-through',
//         opacity: 0.5,
//     },
//     delete: {
//         fontWeight: 'bold',
//         fontSize: 13,
//     },
//     addButton: {
//         backgroundColor: 'darkblue',
//         width: 150,
//         padding: 10,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginTop: 20,
//     },
//     addButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     paramButton: {
//         position: 'absolute',
//         top: 10,
//         right: 10,
//         color: "white",
//     },
//     paramText: {
//         color: "white",
//         fontSize: 20,
//     },
//     profilButton: {
//         position: 'absolute',
//         top: 10,
//         left: 5,
//         color: "white",
//     },
//     profilText: {
//         color: "white",
//         fontSize: 20,
//     },
//     loginButton: {
//         position: 'absolute',
//         top: 35,
//         right: 10,
//         color: "white",
//     },
//     loginText: {
//         color: "white",
//         fontSize: 20,
//     },
//     checkbox: {
//         marginLeft: 10,
//     },
// });

// export default Competence;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Competence = ({ route }) => {
//     const navigation = useNavigation();
//     const [quests, setQuests] = useState([]);
//     const [newCompetence, setNewCompetence] = useState('');
//     const [competences, setCompetences] = useState([]);

//     useEffect(() => {
//         const loadCompetences = async () => {
//             try {
//                 const storedCompetences = await AsyncStorage.getItem('competences');
//                 if (storedCompetences) {
//                     setCompetences(JSON.parse(storedCompetences));
//                 }
//             } catch (error) {
//                 console.log("Erreur lors du chargement des compétences:", error);
//             }
//         };

//         loadCompetences();
//     }, []);

//     const addCompetence = async () => {
//         if (newCompetence.trim() === '') return;

//         const updatedCompetences = [...competences, newCompetence.trim()];
//         setCompetences(updatedCompetences);
//         setNewCompetence('');

//         try {
//             await AsyncStorage.setItem('competences', JSON.stringify(updatedCompetences));
//         } catch (error) {
//             console.log("Erreur lors de la sauvegarde des compétences:", error);
//         }
//     };

//     const navigateToParam = () => {
//         navigation.navigate('Parametre');
//     };

//     const navigateToProfil = () => {
//         navigation.navigate('Profil', { competences });
//     };

//     const navigateToLogin = () => {
//         navigation.navigate('Login');
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Compétences</Text>
            
//             <FlatList
//                 data={competences}
//                 renderItem={({ item }) => <Text style={styles.competenceItem}>{item}</Text>}
//                 keyExtractor={(item, index) => index.toString()}
//             />

//             <TextInput
//                 style={styles.input}
//                 placeholder="Ajouter une compétence"
//                 placeholderTextColor="#aaa"
//                 value={newCompetence}
//                 onChangeText={setNewCompetence}
//             />

//             <TouchableOpacity style={styles.addButton} onPress={addCompetence}>
//                 <Text style={styles.addButtonText}>Ajouter</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity style={styles.paramButton} onPress={navigateToParam}>
//                 <Text style={styles.paramText}>Réglages</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.profilButton} onPress={navigateToProfil}>
//                 <Text style={styles.profilText}>Statut</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
//                 <Text style={styles.loginText}>Connexion</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 60,
//         padding: 20,
//         backgroundColor: "#173c63"
//     },
//     title: {
//         color: "white",
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         alignSelf: 'center',
//     },
//     competenceItem: {
//         color: 'white',
//         fontSize: 19,
//         marginBottom: 10,
//     },
//     input: {
//         backgroundColor: 'white',
//         padding: 10,
//         borderRadius: 10,
//         marginBottom: 20,
//         color: '#000',
//     },
//     addButton: {
//         backgroundColor: 'darkblue',
//         padding: 10,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//     },
//     addButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     paramButton: {
//         position: 'absolute',
//         top: 10,
//         right: 10,
//     },
//     paramText: {
//         color: "white",
//         fontSize: 20,
//     },
//     profilButton: {
//         position: 'absolute',
//         top: 10,
//         left: 5,
//     },
//     profilText: {
//         color: "white",
//         fontSize: 20,
//     },
//     loginButton: {
//         position: 'absolute',
//         top: 35,
//         right: 10,
//     },
//     loginText: {
//         color: "white",
//         fontSize: 20,
//     },
// });

// export default Competence;


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// const Competence = () => {
//     const [competences, setCompetences] = useState(['Anglais', 'Informatique', 'Métallurgie']); // Exemple de compétences

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Compétences</Text>
//             <FlatList
//                 data={competences}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity style={styles.card}>
//                         <Text style={styles.cardText}>{item}</Text>
//                     </TouchableOpacity>
//                 )}
//                 keyExtractor={(item, index) => index.toString()}
//                 contentContainerStyle={styles.cardContainer}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 60,
//         padding: 20,
//         backgroundColor: "#173c63"
//     },
//     title: {
//         color: "white",
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         alignSelf: 'center',
//     },
//     cardContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     card: {
//         backgroundColor: '#2b6cb0',
//         padding: 20,
//         marginVertical: 10,
//         width: '90%',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//     },
//     cardText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     }
// });

// export default Competence;









// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Competence = () => {
//     const navigation = useNavigation();
//     const [competences, setCompetences] = useState([]);
//     const [newCompetence, setNewCompetence] = useState('');





    

//     const handleAddCompetence = () => {
//         if (newCompetence.trim()) {
//             setCompetences([...competences, newCompetence]);
//             setNewCompetence('');
//         }
//     };

//     const renderCompetenceCard = ({ item }) => (
//         <TouchableOpacity style={styles.competenceCard}>
//             <Text style={styles.competenceText}>{item}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             {/* <Text style={styles.title}>Compétences</Text> */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Ajouter une compétence"
//                 placeholderTextColor="#999"
//                 value={newCompetence}
//                 onChangeText={setNewCompetence}
//             />
//             <TouchableOpacity style={styles.addButton} onPress={handleAddCompetence}>
//                 <Text style={styles.addButtonText}>Ajouter</Text>
//             </TouchableOpacity>
//             <FlatList
//                 data={competences}

//                 renderItem={renderCompetenceCard}

                


//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.competenceList}
//             />

//             {/* <FlatList
//                 data={competences}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity style={styles.card}>
//                         <Text style={styles.cardText}>{item}</Text>
//                     </TouchableOpacity>
//                 )}
//                 keyExtractor={(item, index) => index.toString()}
//                 contentContainerStyle={styles.cardContainer}
//             /> */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 60,
//         padding: 20,
//         backgroundColor: "#173c63"
//     },
//     title: {
//         color: "white",
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         alignSelf: 'center',
//     },
//     input: {
//         backgroundColor: 'white',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//         color: '#333',
//     },
//     addButton: {
//         backgroundColor: 'darkblue',
//         padding: 10,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginBottom: 20,
//     },
//     addButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     competenceList: {
//         marginTop: 20,
//     },
//     competenceCard: {
//         backgroundColor: '#2b6cb0',
//         borderRadius: 10,
//         padding: 15,
//         marginBottom: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 5,
//         alignItems: 'center',
//     },
//     competenceText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     // cardContainer: {
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     // },
//     // card: {
//     //     backgroundColor: '#2b6cb0',
//     //     padding: 20,
//     //     marginVertical: 10,
//     //     width: '100%',
//     //     borderRadius: 10,
//     //     shadowColor: '#000',
//     //     shadowOffset: { width: 0, height: 2 },
//     //     shadowOpacity: 0.8,
//     //     shadowRadius: 2,
//     //     elevation: 5,
//     // },
//     // cardText: {
//     //     color: 'white',
//     //     fontSize: 18,
//     //     fontWeight: 'bold',
//     //     textAlign: 'center',
//     // }
// });

// export default Competence;



// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Competence = () => {
//     const [competences, setCompetences] = useState([]);
//     const [newCompetence, setNewCompetence] = useState('');
//     const [isDataLoaded, setIsDataLoaded] = useState(false);

//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const savedCompetences = await AsyncStorage.getItem('competences');
//                 if (savedCompetences !== null) {
//                     setCompetences(JSON.parse(savedCompetences));
//                 }
//                 setIsDataLoaded(true);
//             } catch (error) {
//                 console.log("Erreur lors du chargement des compétences :", error);
//             }
//         };

//         loadData();
//     }, []);

//     useEffect(() => {
//         if (isDataLoaded) {
//             const saveData = async () => {
//                 try {
//                     await AsyncStorage.setItem('competences', JSON.stringify(competences));
//                 } catch (error) {
//                     console.log("Erreur lors de la sauvegarde des compétences :", error);
//                 }
//             };

//             saveData();
//         }
//     }, [competences, isDataLoaded]);

//     const handleAddCompetence = () => {
//         if (newCompetence.trim()) {
//             setCompetences([...competences, newCompetence]);
//             setNewCompetence('');
//         }
//     };

//     const renderCompetenceCard = ({ item }) => (
//         <TouchableOpacity style={styles.competenceCard}>
//             <Text style={styles.competenceText}>{item}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Ajouter une compétence"
//                 placeholderTextColor="#999"
//                 value={newCompetence}
//                 onChangeText={setNewCompetence}
//             />
//             <TouchableOpacity style={styles.addButton} onPress={handleAddCompetence}>
//                 <Text style={styles.addButtonText}>Ajouter</Text>
//             </TouchableOpacity>
//             <FlatList
//                 data={competences}
//                 renderItem={renderCompetenceCard}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.competenceList}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 60,
//         padding: 20,
//         backgroundColor: "#173c63"
//     },
//     input: {
//         backgroundColor: 'white',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//         color: '#333',
//     },
//     addButton: {
//         backgroundColor: 'darkblue',
//         padding: 10,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginBottom: 20,
//     },
//     addButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     competenceList: {
//         marginTop: 20,
//     },
//     competenceCard: {
//         backgroundColor: '#2b6cb0',
//         borderRadius: 10,
//         padding: 15,
//         marginBottom: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 5,
//         alignItems: 'center',
//     },
//     competenceText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default Competence;



// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Competence = () => {
//     const [competences, setCompetences] = useState([]);
//     const [newCompetence, setNewCompetence] = useState('');
//     const [isDataLoaded, setIsDataLoaded] = useState(false);
//     const navigation = useNavigation(); // Utilisation du hook useNavigation

//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const savedCompetences = await AsyncStorage.getItem('competences');
//                 if (savedCompetences !== null) {
//                     setCompetences(JSON.parse(savedCompetences));
//                 }
//                 setIsDataLoaded(true);
//             } catch (error) {
//                 console.log("Erreur lors du chargement des compétences :", error);
//             }
//         };

//         loadData();
//     }, []);

//     useEffect(() => {
//         if (isDataLoaded) {
//             const saveData = async () => {
//                 try {
//                     await AsyncStorage.setItem('competences', JSON.stringify(competences));
//                 } catch (error) {
//                     console.log("Erreur lors de la sauvegarde des compétences :", error);
//                 }
//             };

//             saveData();
//         }
//     }, [competences, isDataLoaded]);

//     const handleAddCompetence = () => {
//         if (newCompetence.trim()) {
//             setCompetences([...competences, newCompetence]);
//             setNewCompetence('');
//         }
//     };

//     const handlePressCompetence = (competence) => {
//         navigation.navigate('DetailsCompetence', { competenceTitle: competence });
//     };

//     const renderCompetenceCard = ({ item }) => (
//         <TouchableOpacity style={styles.competenceCard} onPress={() => handlePressCompetence(item)}>
//             <Text style={styles.competenceText}>{item}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Ajouter une compétence"
//                 placeholderTextColor="#999"
//                 value={newCompetence}
//                 onChangeText={setNewCompetence}
//             />
//             <TouchableOpacity style={styles.addButton} onPress={handleAddCompetence}>
//                 <Text style={styles.addButtonText}>Ajouter</Text>
//             </TouchableOpacity>
//             <FlatList
//                 data={competences}
//                 renderItem={renderCompetenceCard}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.competenceList}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 60,
//         padding: 20,
//         backgroundColor: "#173c63"
//     },
//     input: {
//         backgroundColor: 'white',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//         color: '#333',
//     },
//     addButton: {
//         backgroundColor: 'darkblue',
//         padding: 10,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginBottom: 20,
//     },
//     addButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     competenceList: {
//         marginTop: 20,
//     },
//     competenceCard: {
//         backgroundColor: '#2b6cb0',
//         borderRadius: 10,
//         padding: 15,
//         marginBottom: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 5,
//         alignItems: 'center',
//     },
//     competenceText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default Competence;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation,useFocusEffect  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Competence = () => {
    const [competences, setCompetences] = useState([]);
    const navigation = useNavigation();




    const loadData = async () => {
        try {
            const savedCompetences = await AsyncStorage.getItem('competences');
            if (savedCompetences !== null) {
                setCompetences(JSON.parse(savedCompetences));
            }
        } catch (error) {
            console.log("Erreur lors du chargement des compétences :", error);
        }
    };

    // Charger les données chaque fois que le composant devient actif
    useFocusEffect(
        React.useCallback(() => {
            loadData();
        }, [])
    );

    const handlePressCompetence = (competence) => {
        navigation.navigate('DetailsCompetence', { competenceTitle: competence });
    };

    const renderCompetenceCard = ({ item }) => (
        <TouchableOpacity style={styles.competenceCard} onPress={() => handlePressCompetence(item)}>
            <Text style={styles.competenceText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <FlatList
                data={competences}
                renderItem={renderCompetenceCard}
                keyExtractor={(item, index) => index.toString()}
                style={styles.competenceList}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCompetence')}>
                <Text style={styles.addButtonText}>Ajouter une compétence</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        padding: 20,
        backgroundColor: "#173c63"
    },
    addButton: {
        backgroundColor: 'darkblue',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 50,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    competenceList: {
        marginTop: 20,
    },
    competenceCard: {
        backgroundColor: '#2b6cb0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',
    },
    competenceText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Competence;
