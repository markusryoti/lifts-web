import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

import './App.css';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NewWorkout from './pages/NewWorkout';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/new">
            <NewWorkout />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
