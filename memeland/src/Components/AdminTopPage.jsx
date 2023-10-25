import React from "react";
import "../css/HomePage.css";
import { Link } from "react-router-dom";

const AdminTopPage = () => {
  return (
    <div className="HomeTopPage">
        <div className="HomeTopPage-Logo">
          <img src="Images/Logo.png" alt="" />
          </div>
          <div className="HomeTopPage-title">
            <h1>Welcome To Your Memes</h1>
          </div>
          <div className="HomeTopPage-signinup"><h1> <Link to={"/"}><a href="">Back to Memeland</a></Link></h1></div>
      </div>
  );
};

export default AdminTopPage;




