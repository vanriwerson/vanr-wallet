// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES_LIST,
  ADD_EXPENSE,
  UPDATE_EXPENSES_LIST,
  TOGGLE_EDIT_MODE,
} from '../actions/actionTypes';

const initialState = {
  currencies: [],
  expenses: [],
  editMode: {
    editingExpense: {},
    isEditingAnExpense: false,
    startEdition: false,
  },
};

const walletReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_CURRENCIES_LIST:
    return { ...state,
      currencies: Object.keys(payload)
        .filter((code) => code !== 'USDT') };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload] };
  case UPDATE_EXPENSES_LIST:
    return { ...state, expenses: [...payload] };
  case TOGGLE_EDIT_MODE:
    return { ...state, editMode: { ...payload } };

  default:
    return state;
  }
};

export default walletReducer;
