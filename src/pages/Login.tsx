import React, { useContext, useEffect, useState } from 'react';
import dotenv from 'dotenv';

import { AuthContext } from '../context/auth/AuthState';
dotenv.config();

interface IFormState {
  loginvalue: string | null;
  password: string | null;
}

const Login = (props: any) => {
  const authContext = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState<IFormState>({
    loginvalue: null,
    password: null,
  });

  useEffect(() => {
    if (authContext?.isAuthenticated) {
      props.history.push('/');
    }
    // eslint-disable-next-line
  }, [authContext?.isAuthenticated, props.history]);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...userInfo,
      [e.target.name]: e.target.value,
    };
    setUserInfo(newState);
  };

  const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { loginvalue, password } = userInfo;

    if (!loginvalue || !password) {
      console.error('Need both login values');
      return;
    }

    // Login
    authContext?.login(loginvalue as string, password as string);
  };

  return (
    <div>
      <div className="field">
        <label className="label">Username / Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="text"
            name="loginvalue"
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
