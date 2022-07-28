// Coloque aqui suas actions
import {
  CONFIRM_LOGIN,
  GET_CURRENCIES_LIST,
  ADD_EXPENSE,
  UPDATE_EXPENSES_LIST,
  TOGGLE_EDIT_MODE,
} from './actionTypes';
import fetchCurrencies from '../services/requestAPI';

export const confirmLogin = (payload) => ({
  type: CONFIRM_LOGIN,
  payload,
});

export const getCurrenciesList = (payload) => ({
  type: GET_CURRENCIES_LIST,
  payload,
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  try {
    const data = await fetchCurrencies();
    dispatch(getCurrenciesList(data));
  } catch (error) {
    console.log(error);
  }
};

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const updateExpensesList = (payload) => ({
  type: UPDATE_EXPENSES_LIST,
  payload,
});

export const toggleEditMode = (payload) => ({
  type: TOGGLE_EDIT_MODE,
  payload,
});
