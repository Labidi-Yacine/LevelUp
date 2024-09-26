import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuestDetail = ({ route }) => {
    const { title, type, completed, pointsEarned, selectedDays } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>Type: {type}</Text>
            <Text style={styles.status}>Status: {completed ? 'Terminé' : 'En cours'}</Text>
            <Text style={styles.description}>Points d'expérience : {pointsEarned}</Text>
            <Text style={styles.days}>jours sélectionnés: {selectedDays ? selectedDays.join(', ') : 'Aucun jour sélectionné'}</Text>
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
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default QuestDetail;
