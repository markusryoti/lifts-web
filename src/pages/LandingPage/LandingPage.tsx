import React from 'react';
import { Link } from 'react-router-dom';

import './landingpage.css';

const LandingPage = () => {
  return (
    <>
      <section className="hero is-large hero-bg">
        <div className="hero-body bg-light" style={{ maxWidth: '500px' }}>
          <p className="title has-text-white is-size-1">stay focused</p>
          <p className="subtitle has-text-primary is-size-4">
            Keep track of your progress
          </p>
          <Link to="/signup" className="button is-danger">
            Start Now
          </Link>
        </div>
      </section>
      <div>
        <div>
          <p className="ml-2">
            Photo by{' '}
            <a href="https://unsplash.com/@victorfreitas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Victor Freitas
            </a>{' '}
            on{' '}
            <a href="/s/photos/gym?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </p>
        </div>
        <section className="mt-5">
          <div className="columns mobile-reverse">
            <div className="column">
              <img
                src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt=""
              />
              <a
                className="ml-2"
                href="https://unsplash.com/photos/optBC2FxCfc"
              >
                Selina Selke by Sven Mieke
              </a>
            </div>
            <div className="column">
              <p className="p-3">
                "On the other hand, we denounce with righteous indignation and
                dislike men who are so beguiled and demoralized by the charms of
                pleasure of the moment, so blinded by desire, that they cannot
                foresee the pain and trouble that are bound to ensue; and equal
                blame belongs to those who fail in their duty through weakness
                of will, which is the same as saying through shrinking from toil
                and pain. These cases are perfectly simple and easy to
                distinguish. In a free hour, when our power of choice is
                untrammelled and when nothing prevents our being able to do what
                we like best, every pleasure is to be welcomed and every pain
                avoided. But in certain circumstances and owing to the claims of
                duty or the obligations of business it will frequently occur
                that pleasures have to be repudiated and annoyances accepted.
                The wise man therefore always holds in these matters to this
                principle of selection: he rejects pleasures to secure other
                greater pleasures, or else he endures pains to avoid worse
                pains."
              </p>
            </div>
          </div>
        </section>
        <section className="mt-5">
          <div className="columns">
            <div className="column">
              <p className="p-3">
                "On the other hand, we denounce with righteous indignation and
                dislike men who are so beguiled and demoralized by the charms of
                pleasure of the moment, so blinded by desire, that they cannot
                foresee the pain and trouble that are bound to ensue; and equal
                blame belongs to those who fail in their duty through weakness
                of will, which is the same as saying through shrinking from toil
                and pain. These cases are perfectly simple and easy to
                distinguish. In a free hour, when our power of choice is
                untrammelled and when nothing prevents our being able to do what
                we like best, every pleasure is to be welcomed and every pain
                avoided. But in certain circumstances and owing to the claims of
                duty or the obligations of business it will frequently occur
                that pleasures have to be repudiated and annoyances accepted.
                The wise man therefore always holds in these matters to this
                principle of selection: he rejects pleasures to secure other
                greater pleasures, or else he endures pains to avoid worse
                pains."
              </p>
            </div>
            <div className="column">
              <img
                src="https://images.unsplash.com/photo-1526401485004-46910ecc8e51?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt=""
              />
              <a href="https://unsplash.com/photos/JbI04nYfaJk">
                Photo by Victor Freitas
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
