import axios from 'axios';
import { createContext, useReducer } from 'react';
import authReducer from './authReducer';
import setAuthToken from './setAuthToken';

interface IUser {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface IProvider {
  token: string | null;
  isAuthenticated: boolean;
  user: IUser | null;
  loadUser: () => void;
  login: (username: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IProvider | null>(null);

const AuthState = (props: any) => {
  const initialState = {
    token: localStorage.getItem('lifts_token'),
    isAuthenticated: false,
    user: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.lifts_token) {
      setAuthToken(localStorage.lifts_token);
    }

    // Get user stuff from api
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users`
      );
      dispatch({
        type: 'LOAD_USER',
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (username: string, password: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        {
          username,
          password,
        },
        config
      );

      dispatch({
        type: 'LOGIN',
        payload: result.data,
      });

      loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/signup`,
        {
          username,
          email,
          password,
        },
        config
      );

      dispatch({
        type: 'LOGIN',
        payload: result.data,
      });

      loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loadUser,
        login,
        signup,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
