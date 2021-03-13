import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ChapterCard = ({ title, chapterNumber, verseCount }) => {
    return (
        <View style={styles.card}>
            <View style={styles.textArea}>
                <Text style={styles.chapterNumber}>{`Chapter ${chapterNumber}`}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.verse}>{`${verseCount} Verses`}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: -50,
        marginBottom: 50,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.15,
        zIndex: 2,
    },
    textArea: {
        padding: 20,
    },
    chapterNumber: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        color: '#fff',
    },
    verse: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#fff',
    }
})


export default ChapterCard;
