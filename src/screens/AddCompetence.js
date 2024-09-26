// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const AddCompetence = () => {
//     const [newCompetence, setNewCompetence] = useState('');
//     const navigation = useNavigation();

//     const handleSaveCompetence = async () => {
//         if (newCompetence.trim()) {
//             try {
//                 const savedCompetences = await AsyncStorage.getItem('competences');
//                 const competences = savedCompetences ? JSON.parse(savedCompetences) : [];
//                 const updatedCompetences = [...competences, newCompetence];
//                 await AsyncStorage.setItem('competences', JSON.stringify(updatedCompetences));
//                 navigation.navigate('Competence');
//             } catch (error) {
//                 console.log("Erreur lors de la sauvegarde des compétences :", error);
//             }
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Nom de la compétence"
//                 placeholderTextColor="#999"
//                 value={newCompetence}
//                 onChangeText={setNewCompetence}
//             />
//             <TouchableOpacity style={styles.saveButton} onPress={handleSaveCompetence}>
//                 <Text style={styles.saveButtonText}>Valider</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         justifyContent: 'center',
//         backgroundColor: "#173c63"
//     },
//     input: {
//         backgroundColor: 'white',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 20,
//         color: '#333',
//     },
//     saveButton: {
//         backgroundColor: 'darkblue',
//         padding: 10,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//     },
//     saveButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });

// export default AddCompetence;






// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const AddCompetence = ({ onSave }) => {
//     const [title, setTitle] = useState('');
//     const [type, setType] = useState('vitesse');

//     // const handleSave = () => {
//     //     onSave({ title, type });
//     // };

//         const handleSaveCompetence = async () => {
//         if (newCompetence.trim()) {
//             try {
//                 const savedCompetences = await AsyncStorage.getItem('competences');
//                 const competences = savedCompetences ? JSON.parse(savedCompetences) : [];
//                 const updatedCompetences = [...competences, newCompetence];
//                 await AsyncStorage.setItem('competences', JSON.stringify(updatedCompetences));
//                 navigation.navigate('Competence');
//             } catch (error) {
//                 console.log("Erreur lors de la sauvegarde des compétences :", error);
//             }
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Nom de la compétence"
//                 value={title}
//                 onChangeText={setTitle}
//             />
//             <Picker
//                 selectedValue={type}
//                 onValueChange={(itemValue) => setType(itemValue)}
//                 style={styles.picker}
//             >
//                 <Picker.Item label="Vitesse" value="vitesse" />
//                 <Picker.Item label="Force" value="force" />
//                 <Picker.Item label="Agilité" value="agilité" />
//                 <Picker.Item label="Intelligence" value="intelligence" />
//                 <Picker.Item label="Personnalité" value="personnalité" />
//                 <Picker.Item label="Détermination" value="determination" />
//             </Picker>


//             {/* <Button title="Ajouter compétence" onPress={handleSave} /> */}

//             <TouchableOpacity style={styles.addButton} onPress={handleSave}>
//                     <Text style={styles.addButtonText}>Ajouter compétence</Text>
//             </TouchableOpacity>



//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: '100%',
//         padding: 20,
//         backgroundColor: "#173c63"

//     },
//     input: {
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius:20,
//         padding: 10,
//         marginBottom: 70,
//         marginTop:50,
//         color:'white',
//         fontSize:20,
//     },
//     picker: {
//         marginBottom: 70,
//         color:'white',
//         backgroundColor: 'white',
//         borderRadius:20,
//     },
//     addButton: {
//         backgroundColor: 'darkblue',
//         width: 150,
//         padding: 10,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 20,
//         left:100,
//     },
//     addButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });

// export default AddCompetence;



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddCompetence = () => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('vitesse');
    const navigation = useNavigation();

    const handleSaveCompetence = async () => {
        if (title.trim()) {
            try {
                const newCompetence = { title, type };
                const savedCompetences = await AsyncStorage.getItem('competences');
                const competences = savedCompetences ? JSON.parse(savedCompetences) : [];
                const updatedCompetences = [...competences, newCompetence];
                await AsyncStorage.setItem('competences', JSON.stringify(updatedCompetences));
                navigation.navigate('Competence');
            } catch (error) {
                console.log("Erreur lors de la sauvegarde des compétences :", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nom de la compétence"
                value={title}
                onChangeText={setTitle}
            />
            <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Vitesse" value="vitesse" />
                <Picker.Item label="Force" value="force" />
                <Picker.Item label="Agilité" value="agilité" />
                <Picker.Item label="Intelligence" value="intelligence" />
                <Picker.Item label="Personnalité" value="personnalité" />
                <Picker.Item label="Détermination" value="determination" />
            </Picker>

            <TouchableOpacity style={styles.addButton} onPress={handleSaveCompetence}>
                <Text style={styles.addButtonText}>Ajouter compétence</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        backgroundColor: "#173c63",
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginBottom: 70,
        marginTop: 50,
        color: 'white',
        fontSize: 20,
    },
    picker: {
        marginBottom: 70,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    addButton: {
        backgroundColor: 'darkblue',
        width: 150,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        left: 100,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddCompetence;
