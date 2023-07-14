// store/actions/userActions.ts
import { SET_USER, CLEAR_USER, UserActionTypes, User } from '../types/userTypes';
import { Dispatch } from 'redux';
// import { setAuthToken } from '../../utils/api';
import axios from 'axios';
import axiosInstance from '../../config/axios';

export const setUser = (user: User): UserActionTypes => ({
    type: SET_USER,
    payload: user,
});

export const clearUser = (): UserActionTypes => ({
    type: CLEAR_USER,
});

export const fetchUser = () => async (dispatch: Dispatch<UserActionTypes>): Promise<void> => {
    try {
        const token = window.localStorage.getItem('token');
        if (token) {
            const response = await axiosInstance.get(`/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                dispatch(setUser({ ...response.data.data, token: token }));
            } else {
                dispatch(clearUser());
            }
        } else {
            dispatch(clearUser());
        }
    } catch (error) {
        // Handle error here
        dispatch(clearUser());
    }
};
