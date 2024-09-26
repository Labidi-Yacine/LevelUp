import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import moment from 'moment';

const characteristicsByType = {
    Sport: ['force', 'agilite', 'vitesse'],
    Quotidien: ['intelligence', 'personnalité', 'determination']
};

const AddQuest = () => {
    const [newQuest, setNewQuest] = useState('');
    const [questType, setQuestType] = useState(null);
    const [repeatInterval, setRepeatInterval] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
    const navigation = useNavigation();

    const saveQuest = () => {
        if (
            newQuest.trim() !== '' && 
            questType !== null && 
            selectedCharacteristics.length > 0 &&
            (
                repeatInterval === null || 
                repeatInterval === 'EveryTwoDays' ||  
                (repeatInterval === 'Custom' && selectedDays.length > 0)
            )
        ) {

            let calculatedDays = [];
            if (repeatInterval === 'EveryTwoDays') {
                calculatedDays = calculateEveryTwoDays();
            }

            console.log('Quête sauvegardée avec les caractéristiques suivantes:', selectedCharacteristics);

            navigation.navigate('Home', { 
                newQuest, 
                selectedType: questType, 
                repeatInterval, 
                selectedDays: repeatInterval === 'EveryTwoDays' ? calculatedDays : selectedDays, 
                selectedCharacteristics 
            });
        }
    };

    const calculateEveryTwoDays = () => {
        const today = moment();
        let days = [today.format('dddd')]; // Commence par aujourd'hui
        for (let i = 2; i <= 6; i += 2) {
            days.push(today.add(2, 'days').format('dddd')); // Ajoute chaque deux jours
        }
        return days;
    };

    const toggleDaySelection = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const toggleCharacteristicSelection = (characteristic) => {
        if (selectedCharacteristics.includes(characteristic)) {
            setSelectedCharacteristics(selectedCharacteristics.filter(c => c !== characteristic));
        } else {
            setSelectedCharacteristics([...selectedCharacteristics, characteristic]);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={newQuest}
                    onChangeText={text => setNewQuest(text)}
                    placeholder="Enter new Quest"
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, questType === 'Sport' && styles.selectedButton]}
                        onPress={() => setQuestType('Sport')}
                    >
                        <Text style={styles.buttonText}>Sport</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, questType === 'Quotidien' && styles.selectedButton]}
                        onPress={() => setQuestType('Quotidien')}
                    >
                        <Text style={styles.buttonText}>Quotidien</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, questType === 'Reminder' && styles.selectedButton]}
                        onPress={() => setQuestType('Reminder')}
                    >
                        <Text style={styles.buttonText}>Reminder</Text>
                    </TouchableOpacity>
                </View>

                {questType && (
                    <View style={styles.characteristicsContainer}>
                        <Text style={styles.characteristicsTitle}>Sélectionnez les caractéristiques :</Text>
                        {characteristicsByType[questType].map((characteristic) => (
                            <View key={characteristic} style={styles.characteristic}>
                                <BouncyCheckbox
                                    value={selectedCharacteristics.includes(characteristic)}
                                    onPress={() => toggleCharacteristicSelection(characteristic)}
                                />
                                <Text>{characteristic}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <Picker
                    selectedValue={repeatInterval}
                    onValueChange={(itemValue) => setRepeatInterval(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Tous les deux jours" value="EveryTwoDays" />
                    <Picker.Item label="Custom" value="Custom" />
                </Picker>
                {repeatInterval === 'Custom' && (
                    <View style={styles.daysContainer}>
                        <Text style={styles.daysTitle}>Sélectionnez un jour :</Text>
                        {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(day => (
                            <View key={day} style={styles.days}>
                                <BouncyCheckbox
                                    value={selectedDays.includes(day)}
                                    onPress={() => toggleDaySelection(day)}
                                />
                                <Text>{day}</Text>
                            </View>
                        ))}
                    </View>
                )}
                <TouchableOpacity style={styles.addButton} onPress={saveQuest}>
                    <Text style={styles.addButtonText}>ADD Quest</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#173c63"
    },
    scrollView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "white",
    },
    input: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: 'white',
        width: '80%',
        paddingHorizontal: 10,
        borderRadius: 10,
        position: 'relative',
        bottom: 70,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'darkblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 10,
        position: 'relative',
        bottom: 40,
    },
    selectedButton: {
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: 'darkblue',
        width: 150,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    picker: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20,
    },
    characteristicsContainer: {
        marginBottom: 20,
        position: 'relative',
        bottom: 20,
    },
    characteristicsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    characteristic: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    daysContainer: {
        marginBottom: 20,
    },
    daysTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    days: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default AddQuest;
