import { INCREASE_LOADING, DECREASE_LOADING, LoadingActionTypes } from '../types/loadingTypes';

interface LoadingState {
  loading: number | 0;
}

const initialState: LoadingState = {
  loading: 0,
};

const loadingReducer = (state = initialState, action: LoadingActionTypes): LoadingState => {
  switch (action.type) {
    case INCREASE_LOADING:
      return {
        ...state,
        loading: state.loading + 1,
      };
    case DECREASE_LOADING:
      return {
        ...state,
        loading: state.loading - 1,
      };
    default:
      return state;
  }
};

export default loadingReducer;
