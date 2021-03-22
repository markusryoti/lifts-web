import React, { useContext, useEffect, useState } from 'react';
import dotenv from 'dotenv';

import { AuthContext, IProvider } from '../context/auth/AuthState';
dotenv.config();

interface IFormState {
  loginValue: string | null;
  password: string | null;
}

const Login = (props: any) => {
  const authContext = useContext(AuthContext);

  // Is not going to be null
  const { isAuthenticated, login } = authContext as IProvider;

  const [userInfo, setUserInfo] = useState<IFormState>({
    loginValue: null,
    password: null,
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/workouts');
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...userInfo,
      [e.target.name]: e.target.value,
    };
    setUserInfo(newState);
  };

  const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { loginValue, password } = userInfo;

    if (!loginValue || !password) {
      alert('Need both login values');
      return;
    }

    // Login
    login(loginValue as string, password as string);
  };

  return (
    <div className="container mt-5">
      <div className="field">
        <label className="label">Username / Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="text"
            name="loginValue"
            onChange={onFormChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="password"
            name="password"
            onChange={onFormChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={onFormSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
