import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const logout = () => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
};

export const logoutSucced = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = (expTime) => {
  return {
    type: actionTypes.AUTH_CHECKTIMEOUT,
    expirationTime: expTime
  }
};

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup
  }
  // return dispatch => {
  //   dispatch(authStart());
  //
  //   const authData = {
  //     email,
  //     password,
  //     returnSecureToken: true
  //   };
  //
  //   let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA8dHeEC1Ng-jsnH2pZuSxBtoF8gZjvZog';
  //   if(!isSignup) {
  //     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA8dHeEC1Ng-jsnH2pZuSxBtoF8gZjvZog'
  //   }
  //
  //   axios.post(url, authData)
  //     .then(response => {
  //       localStorage.setItem('token', response.data.idToken);
  //       const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
  //       localStorage.setItem('expirationDate', expirationDate);
  //       localStorage.setItem('userId', response.data.localId);
  //
  //       dispatch(authSuccess(response.data.idToken, response.data.localId));
  //       dispatch(checkAuthTimeout(response.data.expiresIn));
  //     })
  //     .catch(error => {
  //       dispatch(authFail(error.response.data.error));
  //     });
  // }
};

export const setAuthRedurectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
  // return dispatch => {
  //   const token = localStorage.getItem('token');
  //   if(!token) {
  //     dispatch(logout());
  //   } else {
  //     const expirationTime = new Date(localStorage.getItem('expirationDate'));
  //     if(expirationTime <= new Date()) {
  //       dispatch(logout());
  //     } else {
  //       const userId = localStorage.getItem('userId');
  //       dispatch(authSuccess(token, userId));
  //       dispatch(checkAuthTimeout(( expirationTime.getTime() - new Date().getTime() ) / 1000))
  //     }
  //   }
  // }
};