import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialCharacteristics = {
    force: 0,
    agilite: 0,
    intelligence: 0,
    personnalité: 0,
    determination: 0,
    vitesse: 0,
};

const getRank = (level) => {
    const ranks = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
    const index = Math.min(Math.floor((level - 1) / 10), ranks.length - 1);
    return ranks[index];
};

const Profil = ({ route }) => {
    const { totalQuests, completedQuests,  quests = [] } = route.params;

    const [level, setLevel] = useState(1);
    const [rank, setRank] = useState('F');
    const [characteristics, setCharacteristics] = useState(initialCharacteristics);
    const [completedQuestIds, setCompletedQuestIds] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [experiencePoints, setExperiencePoints] = useState( );
    const [username, setUsername] = useState('');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Nouvel état

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedLevel = await AsyncStorage.getItem('level');
                const savedCharacteristics = await AsyncStorage.getItem('characteristics');
                const savedCompletedQuestIds = await AsyncStorage.getItem('completedQuestIds');
                const savedExperiencePoints = await AsyncStorage.getItem('experiencePoints');
                const savedUsername = await AsyncStorage.getItem('username');

                console.log('Saved Level:', savedLevel);
                console.log('Saved Characteristics:', savedCharacteristics);
                console.log('Saved Completed Quest Ids:', savedCompletedQuestIds);
                console.log('Saved Experience Points:', savedExperiencePoints);
                console.log('Saved Username:', savedUsername);

                if (savedLevel !== null) setLevel(parseInt(savedLevel));
                if (savedCharacteristics !== null) setCharacteristics(JSON.parse(savedCharacteristics));
                if (savedCompletedQuestIds !== null) setCompletedQuestIds(JSON.parse(savedCompletedQuestIds));
                if (savedExperiencePoints !== null) setExperiencePoints(parseInt(savedExperiencePoints));
                if (savedUsername !== null) setUsername(savedUsername);

                setIsDataLoaded(true); // Marquer les données comme chargées
            } catch (error) {
                console.log("Error loading data:", error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (isDataLoaded) { // Sauvegarde uniquement si les données sont chargées
            const saveData = async () => {
                try {
                    if (level !== 1 || experiencePoints !== 0) {
                        console.log('Saving Level:', level);
                        console.log('Saving Characteristics:', characteristics);
                        console.log('Saving Completed Quest Ids:', completedQuestIds);
                        console.log('Saving Experience Points:', experiencePoints);
                        console.log('Saving Username:', username);

                        await AsyncStorage.setItem('level', level.toString());
                        await AsyncStorage.setItem('characteristics', JSON.stringify(characteristics));
                        await AsyncStorage.setItem('completedQuestIds', JSON.stringify(completedQuestIds));
                        await AsyncStorage.setItem('experiencePoints', experiencePoints.toString());
                        await AsyncStorage.setItem('username', username);
                    }
                } catch (error) {
                    console.log("Erreur lors de la sauvegarde des données :", error);
                }
            };

            saveData();
        }
    }, [level, characteristics, completedQuestIds, experiencePoints, username, isDataLoaded]);


    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
    //             const savedLevel = await AsyncStorage.getItem('level');
    //             const savedCharacteristics = await AsyncStorage.getItem('characteristics');
    //             const savedCompletedQuestIds = await AsyncStorage.getItem('completedQuestIds');
    //             const savedExperiencePoints = await AsyncStorage.getItem('experiencePoints');
    //             const savedUsername = await AsyncStorage.getItem('username');

    //             console.log('Saved Level:', savedLevel);
    //             console.log('Saved Characteristics:', savedCharacteristics);
    //             console.log('Saved Completed Quest Ids:', savedCompletedQuestIds);
    //             console.log('Saved Experience Points:', savedExperiencePoints);
    //             console.log('Saved Username:', savedUsername);

    //             if (savedLevel !== null) setLevel(parseInt(savedLevel));
    //             if (savedCharacteristics !== null) setCharacteristics(JSON.parse(savedCharacteristics));
    //             if (savedCompletedQuestIds !== null) setCompletedQuestIds(JSON.parse(savedCompletedQuestIds));
    //             if (savedExperiencePoints !== null) setExperiencePoints(parseInt(savedExperiencePoints));
    //             if (savedUsername !== null) setUsername(savedUsername);
    //         } catch (error) {
    //             console.log("Error loading data:", error);
    //         }
    //     };

    //     loadData();
    // }, []);

    // useEffect(() => {
    //     const saveData = async () => {
    //         try {

    //             console.log('Saving Level:', level);
    //             console.log('Saving Characteristics:', characteristics);
    //             console.log('Saving Completed Quest Ids:', completedQuestIds);
    //             console.log('Saving Experience Points:', experiencePoints);
    //             console.log('Saving Username:', username);

    //             await AsyncStorage.setItem('level', level.toString());
    //             await AsyncStorage.setItem('characteristics', JSON.stringify(characteristics));
    //             await AsyncStorage.setItem('completedQuestIds', JSON.stringify(completedQuestIds));
    //             await AsyncStorage.setItem('experiencePoints', experiencePoints.toString());
    //             await AsyncStorage.setItem('username', username);
    //         } catch (error) {
    //             console.log("Erreur lors de la sauvegarde des données :", error);
    //         }
    //     };
    //     saveData();
    // }, [level, characteristics, completedQuestIds, experiencePoints, username]);

    // useEffect(() => {
    //     const saveData = async () => {
    //         try {
    //             // Sauvegarde des données uniquement si elles ne sont pas à leurs valeurs par défaut
    //             if (level !== 1 || experiencePoints !== 0) {
    //                 console.log('Saving Level:', level);
    //                 console.log('Saving Characteristics:', characteristics);
    //                 console.log('Saving Completed Quest Ids:', completedQuestIds);
    //                 console.log('Saving Experience Points:', experiencePoints);
    //                 console.log('Saving Username:', username);
    
    //                 await AsyncStorage.setItem('level', level.toString());
    //                 await AsyncStorage.setItem('characteristics', JSON.stringify(characteristics));
    //                 await AsyncStorage.setItem('completedQuestIds', JSON.stringify(completedQuestIds));
    //                 await AsyncStorage.setItem('experiencePoints', experiencePoints.toString());
    //                 await AsyncStorage.setItem('username', username);
    //             }
    //         } catch (error) {
    //             console.log("Erreur lors de la sauvegarde des données :", error);
    //         }
    //     };
    
    //     saveData();
    // }, [level, characteristics, completedQuestIds, experiencePoints, username]);

    useEffect(() => {
        const loadProfileImage = async () => {
            try {
                const savedProfileImage = await AsyncStorage.getItem('profileImage');
                if (savedProfileImage !== null) {
                    setProfileImage(savedProfileImage);
                }
            } catch (error) {
                console.log("Error loading profile image:", error);
            }
        };

        loadProfileImage();
    }, []);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            await AsyncStorage.setItem('profileImage', result.assets[0].uri);
        }
    };

    useEffect(() => {
        const nextLevelThreshold = 100 * Math.pow(2, level - 1);
        if (experiencePoints >= nextLevelThreshold) {
            const newLevel = level + 1;
            setLevel(newLevel);

            const newCharacteristics = { ...characteristics };
            const newCompletedQuestIds = [...completedQuestIds];

            if (Array.isArray(quests)) {
                console.log('Niveau augmenté ! Nouveau niveau :', newLevel);
                console.log('Traitement des quêtes pour les points de caractéristiques :');
                quests.forEach(quest => {
                    if (quest.completed && !completedQuestIds.includes(quest.id)) {
                        console.log('Traitement de la quête :', quest);
                        if (Array.isArray(quest.selectedCharacteristics)) {
                            quest.selectedCharacteristics.forEach(characteristic => {
                                if (newCharacteristics.hasOwnProperty(characteristic)) {
                                    console.log(`Augmentation de ${characteristic} de 1`);
                                    newCharacteristics[characteristic] += 1;
                                } else {
                                    console.log(`Caractéristique inconnue : ${characteristic}`);
                                }
                            });
                        } else {
                            console.log(`Pas de caractéristiques sélectionnées pour cette quête : ${quest.title}`);
                        }
                        newCompletedQuestIds.push(quest.id);
                    }
                });
            }
            setCharacteristics(newCharacteristics);
            setCompletedQuestIds(newCompletedQuestIds);
        }
    }, [experiencePoints, level, quests, completedQuestIds]);

    useEffect(() => {
        setRank(getRank(level));
    }, [level]);

    return (
        <View style={styles.container}>
            {isEditingUsername ? (
                <TextInput
                    style={styles.usernameInput}
                    placeholder="Entrez votre nom d'utilisateur"
                    placeholderTextColor="rgba(255, 255, 255, 0.6)"
                    value={username}
                    onChangeText={setUsername}
                    onBlur={() => setIsEditingUsername(false)} // Hide input when it loses focus
                />
            ) : (
                <TouchableOpacity onPress={() => setIsEditingUsername(true)}>
                    <Text style={styles.usernameText}>{username || "Entrez votre nom d'utilisateur"}</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                    <Text style={styles.addPhotoText}>Ajouter une photo</Text>
                )}
            </TouchableOpacity>
            {/* <Text style={styles.title}>STATUS</Text> */}
            <Text style={styles.description}>Niveau : {level}</Text>
            <Text style={styles.description}>Rank : {rank}</Text>

            <Text style={styles.description}>QUESTS : {totalQuests - completedQuests}</Text>
            <Text style={styles.description}>COMPLETED QUESTS : {completedQuests}</Text>
            <Text style={styles.description}>Points d'expérience : {experiencePoints}</Text>

            <Text style={styles.caracT}>Caractéristiques :</Text>

            <View style={styles.characteristicsContainer}>
                <View style={styles.characteristicsLeft}>
                    <Text style={styles.carac}>Force : {characteristics.force}</Text>
                    <Text style={styles.carac}>Agilité : {characteristics.agilite}</Text>
                    <Text style={styles.carac}>Vitesse : {characteristics.vitesse}</Text>
                </View>
                <View style={styles.characteristicsRight}>
                    <Text style={styles.caracD}>Intelligence : {characteristics.intelligence}</Text>
                    <Text style={styles.caracD}>Personnalité : {characteristics.personnalité}</Text>
                    <Text style={styles.caracD}>Détermination : {characteristics.determination}</Text>
                </View>
            </View>
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
    usernameInput: {
        width: 'auto',
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        position: 'relative',
        bottom: 150,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fontSize: 30,
        textAlign: "center",
    },
    usernameText: {
        fontSize: 30,
        color: 'white',
        position: 'relative',
        bottom: 150,
        textAlign: 'center',
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom: 35,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 50,
        marginBottom: 90
    },
    addPhotoText: {
        color: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        position: 'absolute',
        top: 10,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    caracT: {
        fontSize: 21,
        textAlign: 'center',
        color: 'white',
        margin: 15,
        fontWeight: 'bold'
    },
    characteristicsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    characteristicsLeft: {
        alignItems: 'flex-start',
        width: '48%',
    },
    characteristicsRight: {
        alignItems: 'flex-end',
        width: '48%',
    },
    carac: {
        fontSize: 19,
        textAlign: 'left',
        color: 'white',
    },
    caracD: {
        fontSize: 19,
        textAlign: 'right',
        color: 'white',
    },
});

export default Profil;
