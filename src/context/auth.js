import React, { createContext, useReducer } from 'react';

import Auth from '../consts/auth';
import { getUser } from '../util/auth';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case Auth.LOGIN:
      return {
        ...state,
        user: action.payload
      }

    case Auth.LOGOUT:
      return {
        ...state,
        user: null
      }

    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, { user: getUser() });

  const login = user => {
    localStorage.setItem('authToken', user.token);
    dispatch({
      type: Auth.LOGIN,
      payload: user
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: Auth.LOGOUT });
  };

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
};

export { AuthContext, AuthProvider };