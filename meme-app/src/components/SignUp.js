import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        
        navigate('/dashboard', { state: { username: name } });
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  return (
    <div className="container forms">
      <div className="form signup">
        <div className="form-content">
          <header>Signup</header>
          <form onSubmit={handleSignUp}>
            <div className="field input-field">
              <input type="text" placeholder="Name" className="input" value={name} onChange={handleNameChange} />
            </div>
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" value={email} onChange={handleEmailChange} />
            </div>
            <div className="field input-field">
              <input type="password" placeholder="Password" className="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="field button-field">
              <button type="submit">Signup</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Already have an account? <Link to="/Login" className="link login-link">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
