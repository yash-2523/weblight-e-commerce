export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';

export interface CartItems {
  count: number
}

export interface FetchCartItemsAction {
  type: typeof FETCH_CART_ITEMS;
  payload: number;
}

export type LoadingActionTypes = FetchCartItemsAction;
