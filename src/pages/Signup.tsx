import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, IProvider } from '../context/auth/AuthState';

interface IFormState {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const Signup = (props: any) => {
  const authContext = useContext(AuthContext) as IProvider;

  const [userInfo, setUserInfo] = useState<IFormState>({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push('/list');
    }
    // eslint-disable-next-line
  }, [authContext.isAuthenticated, props.history]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...userInfo,
      [e.target.name]: e.target.value,
    };
    setUserInfo(newState);
  };

  const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { username, email, password, password2 } = userInfo;

    if (password !== password2) {
      alert("Passwords don't match");
      return;
    }

    if (!username || !password) {
      alert('Need both login values');
    }

    // Signup
    authContext.signup(username, email, password);
  };

  return (
    <div className="container mt-5">
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="text"
            name="username"
            onChange={onValueChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            name="email"
            onChange={onValueChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
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
            onChange={onValueChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>{' '}
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Verify Password</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is"
            type="password"
            name="password2"
            onChange={onValueChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>{' '}
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" /> I agree to the{' '}
            <a href="about">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={onFormSubmit}>
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
