import React from 'react';
import * as actionTypes from './actionTypes';
import axios from '../../services/api';
import { toast } from 'react-toastify';

import Toast from '../../components/UI/Toast/Toast';

export const saveUserStart = () => {
  return {
    type: actionTypes.SAVE_USER_START
  };
};

export const saveUserSuccess = (userId, userData) => {
  return {
    type: actionTypes.SAVE_USER_SUCCESS,
    userId: userId,
    userData: userData
  };
};

export const saveUserFail = (error) => {
  return {
    type: actionTypes.SAVE_USER_FAIL,
    error: error
  };
};

export const updateUserStart = () => {
  return {
    type: actionTypes.UPDATE_USER_START
  };
};

export const updateUserSuccess = (userId, userData) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    userId: userId,
    userData: userData
  };
};

export const updateUserFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error: error
  };
};

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users,
    secretary: null
  };
};

export const fetchUsersFail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  };
};

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user: user
  };
};

export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error: error
  };
};

export const deleteUserStart = () => {
  return {
    type: actionTypes.DELETE_USER_START
  };
};

export const deleteUserSuccess = (userId) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    userId: userId
  };
};

export const deleteUserFail = (error) => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error: error
  };
};

export const saveUser = (userData) => {
  return dispatch => {
    dispatch(saveUserStart());
    axios.post('/users', userData)
      .then(response => {
        const message = `${ userData.name } foi salvo com sucesso!`;
        dispatch(saveUserSuccess(response.data.id, userData));
        toast.success(<Toast toastType="success" message={ message } />);
      })
      .catch(error => {
        dispatch(saveUserFail(error));
        toast.error(<Toast toastType="error" message={ error.response.data.errors[0] } />);
      });
  };
};

export const updateUser = (id, userData) => {
  return dispatch => {
    dispatch(updateUserStart());
    axios.patch('/users/' + id, userData)
      .then(response => {
        const message = `${ userData.name } foi atualizado com sucesso!`;
        dispatch(updateUserSuccess(response.data.id, userData));
        toast.success(<Toast toastType="success" message={ message } />);
      })
      .catch(error => {
        dispatch(updateUserFail(error));
        toast.error(<Toast toastType="error" message={ error.response.data.errors[0] } />);
      });
  };
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axios.get('/users')
      .then(response => {
        dispatch(fetchUsersSuccess(response.data.users));
      })
      .catch(error => {
        dispatch(fetchUsersFail(error));
      });
  };
};

export const fetchUserById = (id) => {
  return dispatch => {
    dispatch(fetchUserStart());
    axios.get('/users/' + id)
      .then(response => {
        dispatch(fetchUserSuccess(response.data.user));
      })
      .catch(error => {
        dispatch(fetchUserFail(error));
      });
  };
};

export const deleteUser = (id) => {
  return dispatch => {
    dispatch(deleteUserStart());
    axios.delete('/users/' + id)
      .then(response => {
        dispatch(deleteUserSuccess(id));
        toast.success(<Toast toastType="success" message={ response.data.data } />);
      })
      .catch(error => {
        dispatch(fetchUserFail(error));
        toast.error(<Toast toastType="error" message={ error.response.data.errors[0] } />);
      });
  };
};
