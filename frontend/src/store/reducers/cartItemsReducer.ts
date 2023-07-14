import axios from 'axios';
import { FetchCartItemsAction, FETCH_CART_ITEMS } from '../types/cartItemsTypes';

interface CartItemsState {
  count: number | 0;
}

const initialState: CartItemsState = {
  count: 0,
};

const cartItemsReducer = (state = initialState, action: FetchCartItemsAction): CartItemsState => {
  switch (action.type) {
    case FETCH_CART_ITEMS:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

export default cartItemsReducer;
