import axios from "../../axios-orders";
import { put } from 'redux-saga/effects';
import * as actions from '../actions'; //default index file

export function* initIngredientsSaga() {
  try {
    const response = yield axios.get('https://burger-builder-aefa4.firebaseio.com/ingredients.json');
    yield put(actions.setIngredients(response.data));
  } catch(error) {
    yield put(actions.fetchIngredientsFailed());
  }
}