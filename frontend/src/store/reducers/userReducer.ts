import { SET_USER, CLEAR_USER, UserActionTypes, User } from '../types/userTypes';

interface UserState {
  user: User | "loading" | null;
}

const initialState: UserState = {
  user: "loading",
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
