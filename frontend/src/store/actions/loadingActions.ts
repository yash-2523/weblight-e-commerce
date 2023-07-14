// store/actions/userActions.ts
import { INCREASE_LOADING, DECREASE_LOADING, Loading, LoadingActionTypes } from '../types/loadingTypes';
import { Dispatch } from 'redux';
// import { setAuthToken } from '../../utils/api';
import axios from 'axios';

export const IncreaseLoading = (): LoadingActionTypes => ({
  type: INCREASE_LOADING,
});

export const DecreaseLoading = (): LoadingActionTypes => ({
    type: DECREASE_LOADING,
  });

export const increaseLoading = () => async (dispatch: Dispatch<LoadingActionTypes>): Promise<void> => {
  dispatch(IncreaseLoading());
};

export const decreaseLoading = () => async (dispatch: Dispatch<LoadingActionTypes>): Promise<void> => {
    dispatch(DecreaseLoading());
}
