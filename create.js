import api from '../../api';
import { setAlert } from './alertActions'; // Optional, if you implement alerts

export const loadUser = () => async dispatch => {
    try {
        const res = await api.get('/auth');
        dispatch({
            type: 'USER_LOADED',
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: 'AUTH_ERROR',
        });
    }
};

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await api.post('/users', body, config);
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: 'REGISTER_FAIL',
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await api.post('/auth', body, config);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: 'LOGIN_FAIL',
        });
    }
};

export const logout = () => dispatch => {
    dispatch({ type: 'LOGOUT' });
};
