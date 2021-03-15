import React from 'react';
import { Link } from 'react-router-dom';

import './landingpage.css';

const LandingPage = () => {
  return (
    <>
      <section className="hero is-large hero-bg">
        <div className="hero-body">
          <p className="title has-text-black-ter">Primary hero</p>
          <p className="subtitle has-text-black-ter">Primary subtitle</p>
          <Link to="/signup" className="button is-danger">
            Start Now
          </Link>
        </div>
      </section>
      <p>
        Photo by{' '}
        <a href="https://unsplash.com/@victorfreitas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Victor Freitas
        </a>{' '}
        on{' '}
        <a href="/s/photos/gym?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </p>
    </>
  );
};

export default LandingPage;
