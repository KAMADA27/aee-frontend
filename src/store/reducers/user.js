import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
  user: null,
  users: [],
  error: null,
  loading: false,
  salved: false
}

const saveUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const saveUserSuccess = (state, action) => {
  const newUser = updateObject(action.userData, { id: action.userId });
  return updateObject(state, {
    salved: true,
    loading: false,
    error: null,
    user: newUser, 
    users: state.users.concat(newUser)
  });
};

const saveUserFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const updateUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const updateUserSuccess = (state, action) => {
  const index = state.users.findIndex(user => user.id === action.userId);
  return updateObject(state, {
    salved: true,
    loading: false,
    error: null,
    users: state.users.slice(index, 1, action.userData)
  });
};

const updateUserFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const fetchUsersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    salved: false,
    users: action.users
  });
};

const fetchUsersFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const fetchUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    user: action.user
  });
};

const fetchUserFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const deleteUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    users: state.users.filter(user => user.id !== action.userId)
  });
};

const deleteUserFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SAVE_USER_START: return saveUserStart(state, action);
    case actionTypes.SAVE_USER_SUCCESS: return saveUserSuccess(state, action);
    case actionTypes.SAVE_USER_FAIL: return saveUserFail(state, action);
    case actionTypes.UPDATE_USER_START: return updateUserStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS: return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL: return updateUserFail(state, action);
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
    case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
    case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
    case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
    case actionTypes.DELETE_USER_START: return deleteUserStart(state, action);
    case actionTypes.DELETE_USER_SUCCESS: return deleteUserSuccess(state, action);
    case actionTypes.DELETE_USER_FAIL: return deleteUserFail(state, action);
    default: return state;
  };
};

export default reducer;