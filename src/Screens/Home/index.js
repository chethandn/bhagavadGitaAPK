import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions, RefreshControl, SafeAreaView } from 'react-native';
import ChapterCard from '../../components/ChapterCard';

import { getChapters } from "../../redux/actions/chapters";

const { width, height } = Dimensions.get('screen');

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export const Home = ({ chapters, fetchChapters }) => {
    const [sortedList, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const init = async () => {
        await fetchChapters();
        setList(
            chapters.sort((a, b) => {
                return a.chapter_number - b.chapter_number;
            })
        );
    };

    useEffect(() => {
        init();
        return () => { };
    }, [chapters]);

    return (
        <SafeAreaView>
            <ScrollView >
                <View contentContainerStyle={styles.profile} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    <ImageBackground source={require('../../assets/bg3.jpg')} style={styles.profileContainer}
                        imageStyle={styles.profileImage}>
                        <View style={styles.profileContainer}>
                            <Text style={styles.profileTexts}>Bhagavad Gita</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.chapters}>
                    {sortedList.map((chapter) => (
                        <ChapterCard
                            key={chapter.chapter_number}
                            title={chapter.translation}
                            chapterNumber={chapter.chapter_number}
                            verseCount={chapter.verses_count}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === 'android' ? 0 : 0,
        marginBottom: 10 * 2,

    },
    profileImage: {
        width: width * 1.1,
        opacity: 0.3
    },
    profileContainer: {
        width: width,
        height: height / 2,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    profileTexts: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chapter: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        flexDirection: 'row',
    }
})

Home.propTypes = {
    chapters: PropTypes.instanceOf(Array),
    fetchChapters: PropTypes.func,
};

Home.defaultProps = {
    chapters: [],
    fetchChapters: () => { },
};

const mapStateToProps = ({ chaptersReducer: { chapters } }) => ({ chapters });

const mapDispatchToProps = {
    fetchChapters: () => getChapters(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
