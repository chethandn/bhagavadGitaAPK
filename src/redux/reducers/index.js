import { combineReducers } from 'redux';

import {
    GET_CHAPTERS,
    GET_VERSES,
    SUCCESS,
    GET_CHAPTER,
    FAIL
} from '../action-types';

const STATE_INT = {
    isLoading: true,
    chapters: [],
    chapter: {},
    verses: [],
    quoteOfTheDay: ''
};

export const chaptersReducer = (state = STATE_INT, { type, payload }) => {
    switch (type) {
        case GET_CHAPTERS:
            return { ...state, isLoading: true };
        case `${GET_CHAPTERS}_${SUCCESS}`:
            return {
                ...state,
                chapters: [...payload],
            }
        case `${GET_CHAPTERS}_${FAIL}`:
            return {
                ...state,
                chapters: { ...payload },
            }
        default:
            return {
                ...state,
            }
    }
};

export const chapterReducer = (state = STATE_INT, { type, payload }) => {
    switch (type) {
        case GET_CHAPTER:
            return { ...state, isLoading: true };
        case `${GET_CHAPTER}_${SUCCESS}`:
            return {
                ...state,
                chapter: { ...payload },
            }
        case `${GET_CHAPTER}_${FAIL}`:
            return {
                ...state,
                chapter: { ...payload },
            }
        default:
            return {
                ...state,
            }
    }
};

export default combineReducers({ chaptersReducer, chapterReducer });



