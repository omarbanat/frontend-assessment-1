import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login successfully') {
          // Redirect to the appropriate dashboard or homepage
          navigate('/regular'); // You can customize this route
        } else {
          alert('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('regular'); // Set default role to 'regular'

  const handleSignup = () => {
    if (!name || !signupPassword) {
      setMessage('Please fill in all fields!');
      return;
    }

    fetch('http://localhost:8000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: name, password: signupPassword, role: signupRole }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setMessage('Signup successful! Please login.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <div className="login-body">
        <div className="main">
          <div className="signup">
            <form>
              <label className="signup_login" htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <select
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
              >
                <option value="regular">Regular</option>
                <option value="admin">Admin</option>
              </select>
              <button onClick={handleSignup}>Sign Up</button>
              {message && <p>{message}</p>}
            </form>
          </div>
          <div className="login">
            <label className="signup_login" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <form onSubmit={handleSubmit}>
              <label>
                Username
                <input
                  className="email_input"
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                Password:
                <input
                  className="email_input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
            <div class="drops">
    <div className="drop drop-1"></div>
    <div className="drop drop-2"></div>
    <div className="drop drop-3"></div>
    <div className="drop drop-4"></div>
    <div className="drop drop-5"></div>
  </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
