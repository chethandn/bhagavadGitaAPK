import { GET_CHAPTER, SUCCESS, FAIL } from '../action-types';

export const getChapter = (id) => dispatch => dispatch({
    type: GET_CHAPTER,
    payload: {
        request: {
            url: `https://vedicscripturesapi.herokuapp.com/gita/${id}`,
            method: 'GET',
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (status) {
                    dispatch({
                        type: `${GET_CHAPTER}_${SUCCESS}`,
                        payload: { ...data },
                    });
                    return Promise.resolve({ ...data });
                }
                dispatch({
                    type: `${GET_CHAPTER}_${SUCCESS}`,
                    payload: { ...error },
                });
                return Promise.reject({ ...error });
            },
            onError(exception) {
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_CHAPTER}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_CHAPTER}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})