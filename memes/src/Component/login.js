import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../style.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
   
      const response = await axios.get('http://localhost:5000/user/getUser');
      const userData = response.data.data;

      const matchingUser = userData.find(
        (user) => user.username === username && user.password === password
      );

      if (matchingUser) {
    
        localStorage.setItem('userId', matchingUser._id);
        console.log(matchingUser._id);
      
        history.push('/OnlyTheUser');
      } else {
        alert('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <label htmlFor="username" className="input-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="input-field"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-field"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
