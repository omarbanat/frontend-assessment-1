import React, { useState } from 'react';
import '../css/Login.css';
// import NavBar from './NavBar';
import { Link, Navigate } from 'react-router-dom'; 
import axios from "axios";

import Dashboard from '../dashbaord/Dashboard';

function Login() {
  const [username, setUserName] = useState(''); 
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(null);
  
  
  
  const handleSignUpClick = () => {
    const LoginContainer = document.getElementById("LoginContainer");
    LoginContainer.classList.add("right-panel-active");
  };

  const handleSignInClick = () => {
    const LoginContainer = document.getElementById("LoginContainer");
    LoginContainer.classList.remove("right-panel-active");
  };

  const handleLogin = async () => {
  
    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName: username, Password: password }),
      });

      const data = await response.json();

      if (response.ok) {
       
        
        localStorage.setItem('userId', data.userId);
        setUserRole(data.role);

      } else {
      
       
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/register', {
        UserName: username,
        Password: password,
      });
  
      if (response.status === 201) {
        console.log('Data added successfully'); 
        setUserRole('User');
      } else {
        console.error('Unable');
      }
    } catch (error) {
      console.error('Error during Sign Up:', error);
    }
  };

  return (
    <div className="Login">
      {/* <NavBar /> */}
      <div className="LoginContainer" id="LoginContainer">
        <div className="form-container sign-in-container">
          <form className="logInForm" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <h1 className="h1login">Sign in</h1>
            <input
              className='inputlogin'
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className='inputlogin'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button className='Sign' type="submit">Sign In</button>
          </form>
        </div>
        <div className="form-container sign-up-container">
        <form className="logInForm" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
            <h1 className="h1login">Create Account</h1>
            <input
              className='inputlogin'
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
           
           
            <input
              className='inputlogin'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            
            <button className='Sign' type="submit">Sign Up</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className='h1login'>Welcome Back!</h1>
              <p className='plogin'>
                To stay connected with us, please login with your personal info
              </p>
              <button className="ghost Sign" id="signIn" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className='h1login'>Hello, Friend!</h1>
              <button className="ghost Sign" id="signUp" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {userRole === 'user' && <Navigate to="/" replace={true} />}
      {userRole === 'Admin' && <Navigate to="/Dashboard" replace={true} />}
    </div>
  );
}

export default Login;
