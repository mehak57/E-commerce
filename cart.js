import api from '../../api';

export const getCart = () => async dispatch => {
    try {
        const res = await api.get('/cart');
        dispatch({
            type: 'GET_CART',
            payload: res.data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const addToCart = (productId, quantity) => async dispatch => {
    try {
        const res = await api.post('/cart', { productId, quantity });
        dispatch({
            type: 'ADD_TO_CART',
            payload: res.data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const removeFromCart = productId => async dispatch => {
    try {
        await api.delete(`/cart/${productId}`);
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: productId,
        });
    } catch (err) {
        console.error(err);
    }
};
