// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <h1>Todo App</h1>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/dashboard" /> : <LoginPage handleLogin={handleLogin} />}
          </Route>
          <Route path="/dashboard">
            {isLoggedIn ? (
              <DashboardPage handleLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
