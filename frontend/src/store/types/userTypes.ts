
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export interface ClearUserAction {
  type: typeof CLEAR_USER;
}

export type UserActionTypes = SetUserAction | ClearUserAction;
