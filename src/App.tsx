import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NewWorkout from './pages/NewWorkout';
import AuthState from './context/auth/AuthState';
import PrivateRoute from './components/PrivateRoute';
import setAuthToken from './context/auth/setAuthToken';
import WorkoutList from './pages/WorkoutList';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage/LandingPage';
import Workout from './pages/Workout';
import Footer from './components/Footer';

if (localStorage.lifts_token) {
  setAuthToken(localStorage.lifts_token);
}

function App() {
  return (
    <Router>
      <AuthState>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/new" component={NewWorkout} />
          <PrivateRoute exact path="/workouts" component={WorkoutList} />
          <PrivateRoute path="/workouts/:id" component={Workout} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
        <Footer />
      </AuthState>
    </Router>
  );
}

export default App;
