import React, { useState } from 'react';

const Login = () => {
  // const [formState, setFormState] = useState<any>();

  return (
    <div>
      <div className="field">
        <label className="label">Username / Email</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input" type="text" />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input" type="password" />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
