// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';

// // const DetailsCompetence = ({ route }) => {
// //     const { competenceTitle } = route.params;

// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.title}>{competenceTitle}</Text>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 20,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         backgroundColor: "#173c63"
// //     },
// //     title: {
// //         color: "white",
// //         fontSize: 24,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //         textAlign: 'center',
// //     },
// // });

// // export default DetailsCompetence;


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const DetailsCompetence = ({ route }) => {
//     const { competenceTitle } = route.params;

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{competenceTitle}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: "#173c63"
//     },
//     title: {
//         color: "white",
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         textAlign: 'center',
//     },
// });

// export default DetailsCompetence;



// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const DetailsCompetence = ({ route }) => {
//     const { competenceTitle } = route.params;
//     const navigation = useNavigation();

//     const handleDelete = async () => {
//         try {
//             // Récupérer les compétences existantes
//             const savedCompetences = await AsyncStorage.getItem('competences');
//             if (savedCompetences !== null) {
//                 let competences = JSON.parse(savedCompetences);

//                 // Filtrer la compétence à supprimer
//                 competences = competences.filter(comp => comp !== competenceTitle);

//                 // Sauvegarder les compétences mises à jour
//                 await AsyncStorage.setItem('competences', JSON.stringify(competences));

//                 // Retourner à l'écran des compétences
//                 navigation.navigate('Competence');
//             }
//         } catch (error) {
//             console.log("Erreur lors de la suppression de la compétence :", error);
//         }
//     };

//     const showDeleteAlert = () => {
//         Alert.alert(
//             "Supprimer la compétence",
//             "Êtes-vous sûr de vouloir supprimer cette compétence ?",
//             [
//                 { text: "Annuler", style: "cancel" },
//                 { text: "Supprimer", onPress: handleDelete }
//             ]
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{competenceTitle}</Text>
//             <TouchableOpacity style={styles.deleteButton} onPress={showDeleteAlert}>
//                 <Text style={styles.deleteButtonText}>Supprimer</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: "#173c63"
//     },
//     title: {
//         color: "white",
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     deleteButton: {
//         marginTop: 20,
//         backgroundColor: 'red',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     deleteButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });

// export default DetailsCompetence;









// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import Slider from '@react-native-community/slider';

// const DetailsCompetence = ({ route }) => {
//     const { competenceTitle } = route.params;
//     const navigation = useNavigation();
//     const [niveau, setNiveau] = useState(0);

//     useEffect(() => {
//         // Charger le niveau de compétence depuis AsyncStorage
//         const loadNiveau = async () => {
//             try {
//                 const savedNiveau = await AsyncStorage.getItem(`niveau_${competenceTitle}`);
//                 if (savedNiveau !== null) {
//                     setNiveau(parseFloat(savedNiveau));
//                 }
//             } catch (error) {
//                 console.log("Erreur lors du chargement du niveau de compétence :", error);
//             }
//         };
//         loadNiveau();
//     }, [competenceTitle]);

//     const handleDelete = async () => {
//         try {
//             const savedCompetences = await AsyncStorage.getItem('competences');
//             if (savedCompetences !== null) {
//                 let competences = JSON.parse(savedCompetences);
//                 competences = competences.filter(comp => comp !== competenceTitle);
//                 await AsyncStorage.setItem('competences', JSON.stringify(competences));

//                 // Supprimer le niveau de compétence associé
//                 await AsyncStorage.removeItem(`niveau_${competenceTitle}`);

//                 navigation.navigate('Competence');
//             }
//         } catch (error) {
//             console.log("Erreur lors de la suppression de la compétence :", error);
//         }
//     };

//     const showDeleteAlert = () => {
//         Alert.alert(
//             "Supprimer la compétence",
//             "Êtes-vous sûr de vouloir supprimer cette compétence ?",
//             [
//                 { text: "Annuler", style: "cancel" },
//                 { text: "Supprimer", onPress: handleDelete }
//             ]
//         );
//     };

//     const handleSliderChange = async (value) => {
//         setNiveau(value);
//         try {
//             await AsyncStorage.setItem(`niveau_${competenceTitle}`, value.toString());
//         } catch (error) {
//             console.log("Erreur lors de la sauvegarde du niveau de compétence :", error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{competenceTitle}</Text>

//             <Text style={styles.niveauText}>Niveau de maîtrise : {niveau.toFixed(1)}</Text>

//             <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={10}
//                 step={0.1}
//                 value={niveau}
//                 onValueChange={handleSliderChange}
//                 minimumTrackTintColor="#1fb28a"
//                 maximumTrackTintColor="#d3d3d3"
//                 thumbTintColor="#b9e4c9"
//             />

//             <TouchableOpacity style={styles.deleteButton} onPress={showDeleteAlert}>
//                 <Text style={styles.deleteButtonText}>Supprimer</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: "#173c63"
//     },
//     title: {
//         color: "white",
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     niveauText: {
//         color: "white",
//         fontSize: 18,
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     slider: {
//         width: '80%',
//         height: 40,
//     },
//     deleteButton: {
//         marginTop: 20,
//         backgroundColor: 'red',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     deleteButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });

// export default DetailsCompetence;



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

const DetailsCompetence = ({ route }) => {
    const { competence } = route.params;
    const navigation = useNavigation();
    const [niveau, setNiveau] = useState(0);

    useEffect(() => {
        // Charger le niveau de compétence depuis AsyncStorage
        const loadNiveau = async () => {
            try {
                const savedNiveau = await AsyncStorage.getItem(`niveau_${competenceTitle}`);
                if (savedNiveau !== null) {
                    setNiveau(parseFloat(savedNiveau));
                }
            } catch (error) {
                console.log("Erreur lors du chargement du niveau de compétence :", error);
            }
        };
        loadNiveau();
    }, [competence]);

    const handleDelete = async () => {
        try {
            const savedCompetences = await AsyncStorage.getItem('competences');
            if (savedCompetences !== null) {
                let competences = JSON.parse(savedCompetences);
                competences = competences.filter(comp => comp !== competence);
                await AsyncStorage.setItem('competences', JSON.stringify(competences));

                // Supprimer le niveau de compétence associé
                await AsyncStorage.removeItem(`niveau_${competence}`);

                navigation.navigate('Competence');
            }
        } catch (error) {
            console.log("Erreur lors de la suppression de la compétence :", error);
        }
    };

    const showDeleteAlert = () => {
        Alert.alert(
            "Supprimer la compétence",
            "Êtes-vous sûr de vouloir supprimer cette compétence ?",
            [
                { text: "Annuler", style: "cancel" },
                { text: "Supprimer", onPress: handleDelete }
            ]
        );
    };

    const handleSliderChange = async (value) => {
        setNiveau(value);
        try {
            await AsyncStorage.setItem(`niveau_${competence}`, value.toString());
        } catch (error) {
            console.log("Erreur lors de la sauvegarde du niveau de compétence :", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{competence.title}</Text>

            <Text style={styles.type}>Type: {competence.type}</Text>

            <Text style={styles.niveauText}>Niveau de maîtrise : {niveau.toFixed(1)}</Text>

            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={0.1}
                value={niveau}
                onValueChange={handleSliderChange}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#b9e4c9"
            />

            <TouchableOpacity style={styles.deleteButton} onPress={showDeleteAlert}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#173c63"
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    niveauText: {
        color: "white",
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    slider: {
        width: '80%',
        height: 40,
    },
    deleteButton: {
        marginTop: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DetailsCompetence;
