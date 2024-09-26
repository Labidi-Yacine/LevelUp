import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveQuests = async (quests) => {
    try {
        await AsyncStorage.setItem('quests', JSON.stringify(quests));
    } catch (error) {
        console.log("Error saving quests:", error);
    }
};

// Fonction pour sauvegarder les points d'expérience
const saveExperiencePoints = async (experiencePoints) => {
    try {
        await AsyncStorage.setItem('experiencePoints', JSON.stringify(experiencePoints));
    } catch (error) {
        console.log("Error saving experience points:", error);
    }
};


const HomeScreen = ({ route }) => {
    const navigation = useNavigation();
    const [quests, setQuests] = useState([]);
    const [experiencePoints, setExperiencePoints] = useState();



    useEffect(() => {
        const loadData = async () => {
            try {
                const savedQuests = await AsyncStorage.getItem('quests');
                if (savedQuests !== null) {
                    setQuests(JSON.parse(savedQuests));
                }

                const savedExperiencePoints = await AsyncStorage.getItem('experiencePoints');
                if (savedExperiencePoints !== null) {
                    setExperiencePoints(parseInt(savedExperiencePoints));
                }
            } catch (error) {
                console.log("Error loading data:", error);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        saveQuests(quests);
    }, [quests]);

    useEffect(() => {
        saveExperiencePoints(experiencePoints);
    }, [experiencePoints]);




    useEffect(() => {
        if (route.params?.newQuest) {
            const showQuestToday = shouldShowQuestToday(route.params.selectedDays, route.params.repeatInterval);
            if (showQuestToday) {
                setQuests([...quests, { id: Date.now(), title: route.params.newQuest, type: route.params.selectedType, completed: false, selectedDays: route.params.selectedDays, selectedCharacteristics: route.params.selectedCharacteristics  }]);
            }
        }
    }, [route.params?.newQuest, route.params?.selectedType, route.params?.selectedCharacteristics, route.params?.selectedDays, route.params?.repeatInterval]);

    const shouldShowQuestToday = (selectedDays, repeatInterval) => {
        const today = new Date().getDay(); 
        if (selectedDays.includes(getDayString(today))) {
            return true;
        }
        if (repeatInterval === 'EveryTwoDays' && today % 2 === 0) {
            return true;
        }
        return false;
    };

    const getDayString = (dayIndex) => {
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        return days[dayIndex];
    };

    const toggleQuestCompletion = (questId, questType) => {
        const updatedQuests = quests.map(quest =>
            quest.id === questId ? { ...quest, completed: !quest.completed } : quest
        );
        setQuests(updatedQuests);
    
        if (!quests.find(quest => quest.id === questId).completed) {
            const pointsEarned = calculatePointsEarned(questType, false);
            setExperiencePoints(experiencePoints + pointsEarned);
        }
    };

    const deleteQuest = (questId) => {
        const updatedQuests = quests.filter(quest => quest.id !== questId);
        setQuests(updatedQuests);
    };

    const navigateToQuestDetail = (item) => {
        navigation.navigate('QuestDetail', {
            title: item.title,
            type: item.type,
            completed: item.completed,
            pointsEarned: calculatePointsEarned(item.type, item.completed),
            selectedDays: item.selectedDays,
            repeatInterval: route.params.repeatInterval
        });
    };

    const navigateToAddQuest = () => {
        navigation.navigate('AddQuest');
    };

    const navigateToParam = () => {
        navigation.navigate('Parametre');
    };

    const navigateToProfil = () => {
        const totalQuests = quests.length;
        const completedQuests = quests.filter(quest => quest.completed).length;
        navigation.navigate('Profil', { totalQuests, completedQuests, experiencePoints, quests, });
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    const navigateToCompetence = () => {
        navigation.navigate('Competence');
    };

    const calculatePointsEarned = (questType, completed) => {
        let pointsEarned = 0;
        if (!completed) {
            switch (questType) {
                case 'Sport':
                    pointsEarned = 50;
                    break;
                case 'Quotidien':
                    pointsEarned = 30;
                    break;
                case 'Reminder':
                    pointsEarned = 20;
                    break;
                default:
                    pointsEarned = 10;
            }
        }
        return pointsEarned;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>QUÊTES</Text>
            <FlatList
                data={quests}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.questItem}>
                        <BouncyCheckbox
                            isChecked={item.completed}
                            onPress={() => toggleQuestCompletion(item.id, item.type)}
                            style={styles.checkbox}
                        />
                        <TouchableOpacity onPress={() => navigateToQuestDetail(item)}>
                            <Text style={[styles.questTitle, item.completed && styles.completed]}>{item.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteQuest(item.id)}>
                            <Text style={styles.delete}>supprimer</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            
            <TouchableOpacity style={styles.paramButton} onPress={navigateToParam}>
                <Text style={styles.paramText}>Réglages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profilButton} onPress={navigateToProfil}>
                <Text style={styles.profilText}>Statut</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
                <Text style={styles.loginText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.competenceButton} onPress={navigateToCompetence}>
                <Text style={styles.competenceText}>Compétences</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.addButton} onPress={navigateToAddQuest}>
                <Text style={styles.addButtonText}>Ajouter une Quête</Text>
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
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    questItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    questTitle: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15,
    },
    completed: {
        textDecorationLine: 'line-through',
        opacity: 0.5,
    },
    delete: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    addButton: {
        backgroundColor: 'darkblue',
        width: 150,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    paramButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: "white",
    },
    paramText: {
        color: "white",
        fontSize: 20,
    },
    profilButton: {
        position: 'absolute',
        top: 10,
        left: 5,
        color: "white",
    },
    profilText: {
        color: "white",
        fontSize: 20,
    },
    loginButton: {
        position: 'absolute',
        top: 35,
        right: 10,
        color: "white",
    },
    loginText: {
        color: "white",
        fontSize: 20,
    },
    competenceButton: {
        position: 'absolute',
        top: 35,
        left: 5,
        color: "white",
    },
    competenceText: {
        color: "white",
        fontSize: 20,
    },
    checkbox: {
        marginLeft: 10,
    },
});

export default HomeScreen;