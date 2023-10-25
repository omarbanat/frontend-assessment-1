import React, { useState } from 'react';
import '../css/SignInUp.css';
import { Link } from "react-router-dom";

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

   
    const userData = {
      username: username,
      password: password,
      role: 'creator' 
    };

    try {
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        setRegistrationSuccess(true);
      } else {
        const data = await response.json();
        console.error('Error occurred while registering:', data.message);
      }
    } catch (error) {
      console.error('Error occurred while registering:', error);
    }
  };

  return (
    <div>
      <div className="LogInForm">
        <div className="LoginFormBox">
          <div className="LoginFormLeft">
            <div className="loginFormInputContainer">
              {registrationSuccess ? (
                <div className="successMessage">
                  Registration successful. Please log in now.
                </div>
              ) : (
                <form onSubmit={handleSignUp}>
                  <h1 className="LoginFormTitle">Sign Up</h1>
                  <input
                    className="LogInEmail"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="LogInPass"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input className="LogInSubmit" type="submit" value="Sign Up" />
                </form>
              )}
              <Link to={"/SignInPage"}>
                <p className="CreateAccount">
                  <a className="CreateAccountLink" href="#">
                    Sign In Now
                  </a>
                </p>
              </Link>
            </div>
          </div>
          <div className="LoginFormRight">
          <Link to={"/"}> <img className="LogInImage" src="Images/LogInImage.png" alt="Login" /> </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
