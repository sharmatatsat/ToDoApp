import React, { useState } from 'react';
import './LoginPage.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import bg1 from './assets/bg1.jpeg'; // Import the image
 import bg6 from './assets/bg6-edited.jpeg';
  // Import the image
 // Import the image
// import bg4 from './assets/bg4.jpeg'; // Import the image

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token); 
      handleLogin(); 
      history.push('/dashboard');
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h2 id="loginText">L O G I N</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <button class = "btn-submit" type="submit">Login</button>
        </form>
      </div>
      <div className="imageBox" style={{ backgroundImage: `url(${bg6})` }}></div>
    </div>
  );
};

export default LoginPage;
