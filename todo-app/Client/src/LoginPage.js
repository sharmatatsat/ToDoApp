import React, { useState } from 'react';
import './LoginPage.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import bg6 from './assets/bg6-edited.jpeg'; // Import the image

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await axios.post('https://todoapp-1-57uv.onrender.com/api/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token); 
      handleLogin(); 
      history.push('/dashboard');
    } catch (error) {
      alert('Invalid username or password');
    } finally {
      setLoading(false); // Set loading back to false after the request completes
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
          {/* Show loading animation when loading is true */}
          <button className="btn-submit" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
      <div className="imageBox" style={{ backgroundImage: `url(${bg6})` }}>
        <h1 className='welcome typing-animation'>Welcome To Task Master !</h1>
      </div>
    </div>
  );
};

export default LoginPage;
