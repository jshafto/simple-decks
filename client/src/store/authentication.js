import Cookies from 'js-cookie';
import {apiUrl} from '../config'

export const SET_USER = 'simple-decks/authentication/SET_USER';
export const REMOVE_USER = 'simple-decks/authentication/REMOVE_USER';
export const CREATE_USER = 'simple-decks/authentication/CREATE_USER';

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const createUser = user => ({
  type: CREATE_USER,
  user,
})

export const login = (email, password) => async dispatch => {
  const response = await fetch(`${apiUrl}/session`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { user } = await response.json();
    dispatch(setUser(user));
  }
};

export const logout = () => async (dispatch) => {
  const authToken = Cookies.get("token");
  console.log(authToken);
  const response = await fetch(`${apiUrl}/session`, {
    method: 'delete',
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signup = (username, email, password) => async dispatch => {
  const response = await fetch(`${apiUrl}/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (response.ok) {
    const { user } = await response.json();
    dispatch(createUser(user));
  }
}

function loadUser() {
  const authToken = Cookies.get("token");
  if (authToken) {
    try {
      const payload = authToken.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      const { data } = payloadObj;
      return data;
    } catch (e) {
      Cookies.remove("token");
    }
  }
  return {};
}

const authReducer = (state = loadUser(), action) => {
  switch (action.type) {
    case SET_USER: {
      return action.user
    }
    case CREATE_USER: {
      return action.user;
    }
    case REMOVE_USER: {
      return {};
    }
    default: return state;
  }
}

export default authReducer;
