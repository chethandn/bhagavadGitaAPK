import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-native";
import { View, Text, StyleSheet } from 'react-native';

import { getChapter } from "../../../redux/actions/chapter";

const Chapter = ({ title, chapterNumber, verseCount }) => {

    const { flag } = useParams();

    const init = async () => {
        await fetchChapter(flag);
    };
    useEffect(() => {
        init();
        return () => { };
    }, []);


    return (
        <View style={styles.card}>
            <View style={styles.textArea}>
                <Text style={styles.chapterNumber}>{`Chapter ${chapterNumber}`}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.verse}>{`${verseCount} Verses`}</Text>
                <Text>Summary in Hindhi</Text>
                <Text>{chapter.summary?.hi}</Text>
                <Text>Summary in English</Text>
                <Text>{chapter.summary?.en}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 20,
        borderRadius: 20,
        backgroundColor: 'black',
        shadowColor: '#fff',
        zIndex: 2,
        elevation: 5,
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


Chapter.propTypes = {
    fetchChapter: PropTypes.func,
    chapter: PropTypes.instanceOf(Object),
};

Chapter.defaultProps = {
    fetchChapter: () => { },
    chapter: {},
};

const mapStateToProps = ({ chapterReducer: { chapter } }) => ({ chapter });
const mapDispatchToProps = { fetchChapter: (id) => getChapter(id) };

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
