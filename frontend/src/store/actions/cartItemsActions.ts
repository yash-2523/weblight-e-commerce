import { FETCH_CART_ITEMS, CartItems, FetchCartItemsAction } from '../types/cartItemsTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import axiosInstance from '../../config/axios';

export const setCartItems = (count: number): FetchCartItemsAction => ({
    type: FETCH_CART_ITEMS,
    payload: count,
});


export const fetchCartItems = () => async (dispatch: Dispatch<FetchCartItemsAction>): Promise<void> => {
    try {
        const token = window.localStorage.getItem('token');
        if (token) {
            const response = await axiosInstance.get(`/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                dispatch(setCartItems(response.data.data.length));
            } else {
                dispatch(setCartItems(0));
            }
        } else {
            dispatch(setCartItems(0));
        }
    } catch (error) {
        // Handle error here
        dispatch(setCartItems(0));
    }
};
