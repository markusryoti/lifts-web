import React, { useContext } from 'react';
import { AuthContext, IProvider } from '../context/auth/AuthState';
import { parseDate } from '../util/time';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext as IProvider;

  return (
    <div className="container mt-5">
      <div className="card p-5">
        <div className="is-flex is-align-items-center">
          <i className="fas fa-2x fa-user"></i>
          <h2 className="title is-2 ml-2">{user?.username}</h2>
        </div>
        <p>Email: {user?.email}</p>
        <p>Join date: {parseDate(user?.created_at as string)}</p>
      </div>
    </div>
  );
};

export default Profile;
