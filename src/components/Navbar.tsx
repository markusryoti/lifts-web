/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, IProvider } from '../context/auth/AuthState';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext as IProvider;

  const [isActive, setIsActive] = useState(false);
  const [showDropDownItems, setShowDropDownItems] = useState(false);

  const burgerNavRef = useRef<any>();

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/home" className="navbar-item">
          <i className="fas fa-3x fa-dumbbell"></i>
        </Link>

        <a
          onClick={() => {
            setIsActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        ref={burgerNavRef}
      >
        <div className="navbar-start">
          <Link className="navbar-item" to="/home">
            Home
          </Link>

          {authContext?.isAuthenticated && (
            <>
              <Link className="navbar-item" to="/list">
                Workouts
              </Link>
              <Link className="navbar-item" to="/new">
                New
              </Link>
            </>
          )}

          <div className="navbar-item has-dropdown is-hoverable">
            <a
              className="navbar-link"
              onClick={() => {
                setShowDropDownItems(!showDropDownItems);
              }}
            >
              More
            </a>
            {showDropDownItems && (
              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            )}
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="button is-primary">
                    <i className="fas fa-user mr-1"></i>
                    {authContext?.user?.username}
                  </Link>
                  <Link
                    to="/logout"
                    className="button is-warning"
                    onClick={() => authContext?.logout()}
                  >
                    <i className="fas fa-sign-out-alt mr-1"></i> Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link className="button is-primary" to="/signup">
                    <strong>Sign up</strong>
                  </Link>
                  <Link className="button is-info" to="/login">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
