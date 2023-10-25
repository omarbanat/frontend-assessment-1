import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });
      if (response.data.success) {
        navigate('/dashboard');
      } else {

        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Login</header>
          <form onSubmit={handleLogin}>
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" value={email} onChange={handleEmailChange} />
            </div>
            <div className="field input-field">
              <input type="password" placeholder="Password" className="password" value={password} onChange={handlePasswordChange} />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field button-field">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Don't have an account? <Link to="/signup" className="link signup-link">Signup</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
