import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { delay } from 'redux-saga'
import axios from "axios/index";

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucced());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  //dispatch(authStart());
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA8dHeEC1Ng-jsnH2pZuSxBtoF8gZjvZog';
  if(!action.isSignup) {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA8dHeEC1Ng-jsnH2pZuSxBtoF8gZjvZog'
  }

  try {
    const response = yield axios.post(url, authData);

    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);

    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch(error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if(!token) {
    yield put(actions.logout());
  } else {
    const expirationTime = yield new Date(localStorage.getItem('expirationDate'));
    if(expirationTime <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout(( expirationTime.getTime() - new Date().getTime() ) / 1000))
    }
  }
}