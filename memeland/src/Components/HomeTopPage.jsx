import React from "react";
import "../css/HomePage.css";
import { Link } from "react-router-dom";
const HomeTopPage = () => {
  return (
    <div className="HomeTopPage">
        <div className="HomeTopPage-Logo">
          <img src="Images/Logo.png" alt="" />
          </div>
          <div className="HomeTopPage-title">
            <h1>Welcome To Memeland</h1>
          </div>
    
        <div className="HomeTopPage-signinup"><h1><Link to="/SignInPage">Signup/SignIn</Link></h1></div>
      </div>
  );
};

export default HomeTopPage;
