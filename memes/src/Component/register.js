import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();

        const requestData = {
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/user/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                setRegistrationStatus('Registration Succeeded');
            } else {
                setRegistrationStatus('Registration Failed');
                console.error('Registration failed');
            }
        } catch (error) {
            setRegistrationStatus('Network Error');
            console.error('Network error:', error);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Register</h2>
            <form onSubmit={handleRegister}>
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
                    Register
                </button>
                {registrationStatus && <p>{registrationStatus}</p>}
                <p>
                    You already have an account? <Link to="/dash">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;
