import { FAIL, GET_CHAPTERS, SUCCESS } from '../action-types';

export const getChapters = () => dispatch => dispatch({
    type: GET_CHAPTERS,
    payload: {
        request: {
            url: `https://vedicscripturesapi.herokuapp.com/gita/chapters`,
            method: 'GET',
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (status) {
                    dispatch({
                        type: `${GET_CHAPTERS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    return Promise.resolve({ ...data });
                }
                dispatch({
                    type: `${GET_CHAPTERS}_${SUCCESS}`,
                    payload: { ...error },
                });
                return Promise.reject({ ...error });
            },
            onError(exception) {
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_CHAPTERS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_CHAPTERS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})