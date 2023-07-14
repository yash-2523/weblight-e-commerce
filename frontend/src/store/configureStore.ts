// store/configureStore.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import loadingReducer from './reducers/loadingReducer';
import cartItemsReducer from './reducers/cartItemsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  cartItems: cartItemsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};
