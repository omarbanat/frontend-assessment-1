import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/SignInUp.css";

function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          localStorage.setItem("userId", data.user._id);

          setMessage("Sign in successfully");

          if (data.user.role === "creator") {
            navigate("/AdminPage");
          }
        } else {
          setMessage("Username or password incorrect");
        }
      }
    } catch (error) {
      setMessage("An error occurred while signing in");
    }

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div>
      <div className="LogInForm">
        <div className="LoginFormBox">
          <div className="LoginFormLeft">
            <Link to="/">
              <img className="LogInImage" src="Images/LogInImage.png" alt="Login" />
            </Link>
          </div>
          <div className="LoginFormRight">
            <div className="loginFormInputContainer">
              <form onSubmit={handleSignIn}>
                <h1 className="LoginFormTitle">Sign In</h1>
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
                <input className="LogInSubmit" type="submit" value="Sign In" />
                <p className="Message">{message}</p>
                <Link to="/SignUpPage">
                  <p className="CreateAccount">
                    <a className="CreateAccountLink" href="#">
                      Create your account
                    </a>
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
