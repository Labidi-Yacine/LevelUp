import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Competence = () => {
    const [competences, setCompetences] = useState(['Anglais', 'Informatique', 'Métallurgie']); // Exemple de compétences

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Compétences</Text>
            <FlatList
                data={competences}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.cardText}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.cardContainer}
            />
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
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#2b6cb0',
        padding: 20,
        marginVertical: 10,
        width: '90%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Competence;