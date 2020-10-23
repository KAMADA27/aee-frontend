import axios from '../../services/api';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, id) => {
  return {
    type: actionTypes.AUTH_SUCESSS,
    token: token,
    id: id
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('id');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password
    };

    axios.post('/auth/signin', authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + 1800 * 1000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('id', response.data.user.id);
        dispatch(authSuccess(response.data.token, response.data.user.id));
        dispatch(checkAuthTimeout(1800));
      }) 
      .catch(error => {
        dispatch(authFail(error))
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const id = localStorage.getItem('id');
        dispatch(authSuccess(token, id));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};