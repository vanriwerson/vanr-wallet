// Esse reducer será responsável por tratar as informações da pessoa usuária
import { CONFIRM_LOGIN } from '../actions/actionTypes';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case CONFIRM_LOGIN:
    return { ...state, email: payload };

  default:
    return state;
  }
};

export default userReducer;
